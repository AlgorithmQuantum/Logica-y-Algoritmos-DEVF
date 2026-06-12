const invitados = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

function encontrarPareja(arr) {
  let inicio = 0;
  let siguiente = 1;
  
  while (siguiente < arr.length) {
    // Obtener la primera letra de cada nombre (inicial)
    const inicialInicio = arr[inicio][0].toLowerCase();
    const inicialSiguiente = arr[siguiente][0].toLowerCase();
    
    // Compara las iniciales de los nombres en los punteros
    if (inicialInicio === inicialSiguiente) {
      // Si coinciden, devuelve el par
      return [arr[inicio], arr[siguiente]];
    }
    
    // Avanza los punteros si no coinciden
    inicio++;
    siguiente++;
  }
  
  return null; // Si no se encuentra ningún par
}

console.log(encontrarPareja(invitados));
// Resultado: ["Carlos", "Cecilia"]

// Probando con diferentes arreglos
console.log(encontrarPareja(["Luis", "Maria", "Marco", "Pedro"])); 
// Resultado: ["Maria", "Marco"] (ambos empiezan con 'm')

console.log(encontrarPareja(["Juan", "Pedro", "Luis", "Ana"])); 
// Resultado: null (no hay iniciales consecutivas iguales)

console.log(encontrarPareja(["Roberto", "Rosa", "Ricardo"])); 
// Resultado: ["Roberto", "Rosa"] (ambos empiezan con 'r')

// Caso con mayúsculas/minúsculas mixtas
console.log(encontrarPareja(["ana", "Andrea", "Alberto"])); 
// Resultado: ["ana", "Andrea"] (ambos empiezan con 'a' después de toLowerCase)