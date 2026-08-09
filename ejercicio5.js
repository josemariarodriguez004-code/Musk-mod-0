const readline = require("readline");

function invertirPalabra(palabra) {
  const pila = [];

  for (const letra of palabra) {
    pila.push(letra);
  }

  let invertida = "";

  while (pila.length > 0) {
    invertida += pila.pop();
  }

  return invertida;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce una palabra: ", (palabra) => {
  console.log(`La palabra invertida es "${invertirPalabra(palabra)}".`);
  rl.close();
});
