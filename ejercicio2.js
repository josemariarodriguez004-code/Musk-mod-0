const crypto = require("crypto");

function diferenciaDeConjuntos(array1, array2) {
  return array1.filter((numero) => !array2.includes(numero));
}

function generarArrayAleatorio(tamano, maximo) {
  const numeros = [];

  for (let i = 0; i < tamano; i++) {
    numeros.push(crypto.randomInt(1, maximo + 1));
  }

  return numeros;
}

const array1 = generarArrayAleatorio(5, 10);
const array2 = generarArrayAleatorio(3, 10);
const diferencia = diferenciaDeConjuntos(array1, array2);

console.log(`Array 1: [${array1.join(", ")}]`);
console.log(`Array 2: [${array2.join(", ")}]`);
console.log(`La diferencia de ambos conjuntos es [${diferencia.join(", ")}]`);
