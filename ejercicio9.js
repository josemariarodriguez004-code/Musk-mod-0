const readline = require("readline");

function estanBalanceados(texto) {
  const pila = [];

  for (const caracter of texto) {
    if (caracter === "(") {
      pila.push(caracter);
    } else if (caracter === ")") {
      if (pila.length === 0) {
        return false;
      }

      pila.pop();
    }
  }

  return pila.length === 0;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce un texto: ", (texto) => {
  if (estanBalanceados(texto)) {
    console.log("Están balanceados.");
  } else {
    console.log("No están balanceados.");
  }

  rl.close();
});
