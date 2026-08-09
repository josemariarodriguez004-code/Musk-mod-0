const readline = require("readline");

function calcularFrecuencias(palabra) {
  const frecuencias = new Map();

  for (const caracter of palabra.toLowerCase()) {
    if (frecuencias.has(caracter)) {
      frecuencias.set(caracter, frecuencias.get(caracter) + 1);
    } else {
      frecuencias.set(caracter, 1);
    }
  }

  return frecuencias;
}

function sonAnagramas(palabra1, palabra2) {
  const frecuencias1 = calcularFrecuencias(palabra1);
  const frecuencias2 = calcularFrecuencias(palabra2);

  if (frecuencias1.size !== frecuencias2.size) {
    return false;
  }

  for (const [caracter, veces] of frecuencias1) {
    if (frecuencias2.get(caracter) !== veces) {
      return false;
    }
  }

  return true;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce una palabra: ", (palabra1) => {
  rl.question("Introduce otra palabra: ", (palabra2) => {
    if (sonAnagramas(palabra1, palabra2)) {
      console.log("Las palabras son anagramas.");
    } else {
      console.log("Las palabras no son anagramas.");
    }

    rl.close();
  });
});
