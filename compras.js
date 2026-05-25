const listaDeCompras = []; 

function agregarProducto(producto) {
    listaDeCompras.push(producto);
}

function eliminarProducto(producto){
    listaDeCompras.pop(producto);
}

function mostrarLista() {
    console.log("Lista de compras:");
    listaDeCompras.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto}`);
    });
}

function iniciarApp() {
    // Ejemplo de uso
    agregarProducto("Leche");
    agregarProducto("Pan");
    agregarProducto("Huevos");  
    mostrarLista();

    eliminarProducto("Pan");
    mostrarLista();
}

iniciarApp();