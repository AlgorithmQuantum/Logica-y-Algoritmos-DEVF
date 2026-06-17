const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const NOTES_FILE = path.join(DATA_DIR, 'notas.json');

// Asegurar que la carpeta data existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Leer notas desde el archivo JSON
function leerNotas() {
  try {
    if (!fs.existsSync(NOTES_FILE)) {
      fs.writeFileSync(NOTES_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer notas:', error);
    return [];
  }
}

// Guardar notas en el archivo JSON
function guardarNotas(notas) {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notas, null, 2));
    return true;
  } catch (error) {
    console.error('Error al guardar notas:', error);
    return false;
  }
}

// Servir archivos estáticos (HTML, CSS, JS)
function servirArchivo(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Archivo no encontrado');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Manejador de peticiones
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // --- Rutas de archivos estáticos ---
  if (pathname === '/' || pathname === '/index.html') {
    servirArchivo(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    return;
  }
  if (pathname === '/styles.css') {
    servirArchivo(res, path.join(__dirname, 'public', 'styles.css'), 'text/css');
    return;
  }
  if (pathname === '/app.js') {
    servirArchivo(res, path.join(__dirname, 'public', 'app.js'), 'application/javascript');
    return;
  }

  // --- API: Obtener todas las notas (GET /api/notas) ---
  if (pathname === '/api/notas' && req.method === 'GET') {
    const notas = leerNotas();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notas));
    return;
  }

  // --- API: Crear nueva nota (POST /api/notas) ---
  if (pathname === '/api/notas' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { titulo, contenido } = JSON.parse(body);
        if (!titulo || !contenido) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Título y contenido son obligatorios' }));
          return;
        }

        const notas = leerNotas();
        // Evitar títulos duplicados
        if (notas.some(n => n.titulo === titulo)) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Ya existe una nota con ese título' }));
          return;
        }

        notas.push({ titulo, contenido });
        if (guardarNotas(notas)) {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Nota creada exitosamente' }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al guardar la nota' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Datos inválidos' }));
      }
    });
    return;
  }

  // --- API: Eliminar nota (DELETE /api/notas?titulo=...) ---
  if (pathname === '/api/notas' && req.method === 'DELETE') {
    const titulo = parsedUrl.query.titulo;
    if (!titulo) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Se requiere el título' }));
      return;
    }

    let notas = leerNotas();
    const nuevaLista = notas.filter(n => n.titulo !== titulo);
    if (notas.length === nuevaLista.length) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Nota no encontrada' }));
      return;
    }

    if (guardarNotas(nuevaLista)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Nota eliminada' }));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al eliminar la nota' }));
    }
    return;
  }

  // --- Ruta no encontrada ---
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 - Ruta no encontrada');
});

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});