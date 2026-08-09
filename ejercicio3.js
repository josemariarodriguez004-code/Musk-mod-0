const readline = require("readline");

function calcularFrecuencias(cadena) {
  const frecuencias = new Map();

  for (const caracter of cadena.toLowerCase()) {
    if (frecuencias.has(caracter)) {
      frecuencias.set(caracter, frecuencias.get(caracter) + 1);
    } else {
      frecuencias.set(caracter, 1);
    }
  }

  return frecuencias;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce un texto: ", (texto) => {
  console.log("Mapa de frecuencias:");
  console.log(calcularFrecuencias(texto));
  rl.close();
});
