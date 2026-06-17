// Elementos del DOM
const form = document.getElementById('formNota');
const tituloInput = document.getElementById('titulo');
const contenidoInput = document.getElementById('contenido');
const listaDiv = document.getElementById('listaNotas');
const mensajeDiv = document.getElementById('mensaje');

// Mostrar mensajes temporales
function mostrarMensaje(texto, tipo = 'error') {
  mensajeDiv.textContent = texto;
  mensajeDiv.className = `mensaje ${tipo}`;
  mensajeDiv.style.display = 'block';
  setTimeout(() => {
    mensajeDiv.style.display = 'none';
  }, 4000);
}

// Cargar y mostrar todas las notas
async function cargarNotas() {
  try {
    const respuesta = await fetch('/api/notas');
    if (!respuesta.ok) throw new Error('Error al cargar notas');
    const notas = await respuesta.json();
    
    if (notas.length === 0) {
      listaDiv.innerHTML = '<div class="sin-notas">📭 No hay notas guardadas. ¡Crea una arriba!</div>';
      return;
    }
    
    // Generar HTML de cada nota
    listaDiv.innerHTML = notas.map(nota => `
      <div class="nota">
        <h3>${escapeHTML(nota.titulo)}</h3>
        <p>${escapeHTML(nota.contenido)}</p>
        <button onclick="eliminarNota('${escapeHTML(nota.titulo)}')">🗑️ Eliminar</button>
      </div>
    `).join('');
  } catch (error) {
    console.error(error);
    listaDiv.innerHTML = '<div class="sin-notas">❌ Error al cargar las notas</div>';
  }
}

// Escapar HTML para evitar XSS (seguridad básica)
function escapeHTML(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
    return c;
  });
}

// Crear nueva nota
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const contenido = contenidoInput.value.trim();
  
  if (!titulo || !contenido) {
    mostrarMensaje('❌ El título y el contenido son obligatorios', 'error');
    return;
  }
  
  try {
    const respuesta = await fetch('/api/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, contenido })
    });
    
    const data = await respuesta.json();
    if (!respuesta.ok) {
      mostrarMensaje(data.error || 'Error al guardar', 'error');
      return;
    }
    
    mostrarMensaje('✅ Nota guardada exitosamente', 'exito');
    tituloInput.value = '';
    contenidoInput.value = '';
    cargarNotas(); // recargar lista
  } catch (error) {
    mostrarMensaje('Error de conexión con el servidor', 'error');
  }
});

// Eliminar nota (función global llamada desde el botón)
window.eliminarNota = async (titulo) => {
  if (!confirm(`¿Eliminar la nota "${titulo}"?`)) return;
  
  try {
    const respuesta = await fetch(`/api/notas?titulo=${encodeURIComponent(titulo)}`, {
      method: 'DELETE'
    });
    const data = await respuesta.json();
    if (!respuesta.ok) {
      mostrarMensaje(data.error || 'Error al eliminar', 'error');
      return;
    }
    mostrarMensaje('🗑️ Nota eliminada', 'exito');
    cargarNotas();
  } catch (error) {
    mostrarMensaje('Error de conexión', 'error');
  }
};

// Cargar notas al iniciar
cargarNotas();