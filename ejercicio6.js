const crypto = require("crypto");

const TAMANO = 100000;

function bubbleSort(numeros) {
  for (let i = 0; i < numeros.length - 1; i++) {
    for (let j = 0; j < numeros.length - 1 - i; j++) {
      if (numeros[j] > numeros[j + 1]) {
        const temporal = numeros[j];
        numeros[j] = numeros[j + 1];
        numeros[j + 1] = temporal;
      }
    }
  }

  return numeros;
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
bubbleSort(numeros);
const segundos = (Date.now() - inicio) / 1000;

console.log(`El algoritmo bubble sort ha tardado ${segundos} segundos en ordenar ${TAMANO} elementos.`);
