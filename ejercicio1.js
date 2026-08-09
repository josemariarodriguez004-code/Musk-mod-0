const readline = require("readline");

function encontrarPalabrasRepetidas(texto) {
  const palabras = texto.toLowerCase().replace(/[.,;:¡!¿?]/g, "").split(/\s+/);
  const vistas = new Set();
  const repetidas = new Set();

  for (const palabra of palabras) {
    if (vistas.has(palabra)) {
      repetidas.add(palabra);
    }
    vistas.add(palabra);
  }

  return [...repetidas];
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce un texto: ", (texto) => {
  const repetidas = encontrarPalabrasRepetidas(texto);

  if (repetidas.length === 0) {
    console.log("No se repite ninguna palabra");
  } else {
    console.log(`Se repiten las siguientes palabras: ${repetidas.join(", ")}`);
  }

  rl.close();
});
