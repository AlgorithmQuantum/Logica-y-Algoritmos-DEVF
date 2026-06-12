// 1. Crear arreglo de objetos con al menos 5 productos
const productos = [
  { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
  { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
  { nombre: "Libro", precio: 12, categoria: "Educación" },
  { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
  { nombre: "Celular", precio: 600, categoria: "Electrónica" },
  { nombre: "Mochila", precio: 35, categoria: "Accesorios" }, // Producto adicional
];

console.log("=== PRODUCTOS ORIGINALES ===");
console.log(productos);

// 2. Usar filter() para obtener productos que cuesten menos de $100
const productosMenosDe100 = productos.filter(producto => producto.precio < 100);

console.log("\n=== PRODUCTOS CON PRECIO MENOR A $100 ===");
console.log(productosMenosDe100);

// 3. Usar sort() para ordenar esos productos alfabéticamente por su nombre
const productosOrdenados = [...productosMenosDe100].sort((a, b) => 
  a.nombre.localeCompare(b.nombre)
);

console.log("\n=== PRODUCTOS ORDENADOS ALFABÉTICAMENTE ===");
console.log(productosOrdenados);

// 4. Usar map() para generar un nuevo arreglo con solo los nombres
const soloNombres = productosOrdenados.map(producto => producto.nombre);

console.log("\n=== SOLO LOS NOMBRES DE LOS PRODUCTOS ===");
console.log(soloNombres);

// 5. Los resultados ya se mostraron en consola en cada paso

// 6. (Opcional) Usando reduce() para calcular el precio total de productos baratos
const precioTotalBaratos = productosMenosDe100.reduce((acumulador, producto) => 
  acumulador + producto.precio, 0
);

console.log("\n=== (OPCIONAL) PRECIO TOTAL DE PRODUCTOS BARATOS ===");
console.log(`El precio total de los productos menores a $100 es: $${precioTotalBaratos}`);

// Otro ejemplo opcional con some() para verificar si hay productos de electrónica baratos
const hayElectronicaBarata = productosMenosDe100.some(producto => 
  producto.categoria === "Electrónica"
);

console.log("\n=== (OPCIONAL) VERIFICACIÓN ADICIONAL ===");
console.log(`¿Hay productos de electrónica menores a $100? ${hayElectronicaBarata ? "Sí" : "No"}`);

// Ejemplo con every() para verificar si todos los productos baratos cuestan más de $0
const todosPrecioPositivo = productosMenosDe100.every(producto => producto.precio > 0);
console.log(`¿Todos los productos tienen precio positivo? ${todosPrecioPositivo ? "Sí" : "No"}`);