const crypto = require("crypto");

const TAMANO = 100000;

function quicksort(numeros) {
  if (numeros.length <= 1) {
    return numeros;
  }

  const pivote = numeros[0];
  const menores = [];
  const mayores = [];

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] < pivote) {
      menores.push(numeros[i]);
    } else {
      mayores.push(numeros[i]);
    }
  }

  return [...quicksort(menores), pivote, ...quicksort(mayores)];
}

function generarArrayAleatorio(tamano) {
  const numeros = [];

  for (let i = 0; i < tamano; i++) {
    numeros.push(crypto.randomInt(1, 1000000));
  }

  return numeros;
}

const numeros = generarArrayAleatorio(TAMANO);
const inicio = Date.now();
quicksort(numeros);
const segundos = (Date.now() - inicio) / 1000;

console.log(`El algoritmo quicksort ha tardado ${segundos} segundos en ordenar ${TAMANO} elementos.`);
