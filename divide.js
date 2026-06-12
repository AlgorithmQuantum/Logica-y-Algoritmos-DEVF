function findMax(arr) {
  // Caso base: si el arreglo tiene un solo elemento
  if (arr.length === 1) {
    return arr[0];
  }
  
  // Dividir el arreglo en dos mitades
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Llamar recursivamente a la función para ambas mitades
  const leftMax = findMax(left);
  const rightMax = findMax(right);
  
  // Combinar las soluciones comparando los máximos
  return Math.max(leftMax, rightMax);
}

// Ejemplo de entrada
const numbers = [3, 8, 2, 10, 5, 7];
console.log(findMax(numbers)); // Salida: 10

// Diferentes casos de prueba
console.log(findMax([1, 2, 3, 4, 5]));        // 5 (creciente)
console.log(findMax([10, 8, 6, 4, 2]));       // 10 (decreciente)
console.log(findMax([7]));                     // 7 (un elemento)
console.log(findMax([-5, -2, -10, -3]));       // -2 (negativos)
console.log(findMax([100, 100, 100]));         // 100 (todos iguales)

// Arreglo más grande
const muchosNumeros = [45, 23, 89, 12, 76, 34, 91, 56, 28, 67];
console.log(findMax(muchosNumeros)); // 91