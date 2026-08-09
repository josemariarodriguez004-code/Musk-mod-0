const readline = require("readline");

function esPrimo(numero) {
  if (numero < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) {
      return false;
    }
  }

  return true;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Introduce un número: ", (respuesta) => {
  const numero = Number(respuesta);

  if (esPrimo(numero)) {
    console.log(`${numero} es primo.`);
  } else {
    console.log(`${numero} no es primo.`);
  }

  rl.close();
});
