// Arreglo de regalos para buscar
const gifts = ["Peluche", "Bicicleta", "Videojuego", "Libro", "Cámara"];

function buscarRegalo(gifts, giftName, index = 0) {
  // Caso base 1: Si el índice llegó al final del arreglo
  if (index === gifts.length) {
    return ` El regalo "${giftName}" no está en la lista.`;
  }
  
  // Caso base 2: Si encontramos el regalo en la posición actual
  if (gifts[index] === giftName) {
    return ` ¡El regalo "${giftName}" está en la posición ${index}!`;
  }
  
  // Llamada recursiva: avanzamos al siguiente índice
  return buscarRegalo(gifts, giftName, index + 1);
}

// Pruebas del programa
console.log("=== BÚSQUEDA RECURSIVA DE REGALOS ===\n");

console.log(buscarRegalo(gifts, "Videojuego"));
// Resultado: 🎁 ¡El regalo "Videojuego" está en la posición 2!

console.log(buscarRegalo(gifts, "Cámara"));
// Resultado: 🎁 ¡El regalo "Cámara" está en la posición 4!

console.log(buscarRegalo(gifts, "Computadora"));
// Resultado: ❌ El regalo "Computadora" no está en la lista.

console.log(buscarRegalo(gifts, "Peluche"));
// Resultado: 🎁 ¡El regalo "Peluche" está en la posición 0!