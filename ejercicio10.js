const readline = require("readline");

function esSecuenciaValida(secuencia) {
  const pila = [];
  const parejas = { ")": "(", "]": "[", "}": "{" };

  for (const caracter of secuencia) {
    if (caracter === "(" || caracter === "[" || caracter === "{") {
      pila.push(caracter);
    } else if (parejas[caracter]) {
      if (pila.pop() !== parejas[caracter]) {
        return false;
      }
    }
  }

  return pila.length === 0;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce una secuencia: ", (secuencia) => {
  if (esSecuenciaValida(secuencia)) {
    console.log("Secuencia correcta.");
  } else {
    console.log("Secuencia incorrecta.");
  }

  rl.close();
});
