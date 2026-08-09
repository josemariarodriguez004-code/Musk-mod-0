const readline = require("readline");

function analizarSecuencia(secuencia) {
    const pila = [];
    const parejas = {
        ")": "(",
        "]": "[",
        "}": "{"
    };

    for (let i = 0; i < secuencia.length; i++) {
        const caracter = secuencia[i];

        if (caracter === "(" || caracter === "[" || caracter === "{") {
            pila.push(caracter);
        } 
        else if (parejas[caracter]) {
            if (pila.length === 0) {
                return {
                    valida: false,
                    mensaje: `Error en la posición ${i + 1}: cierre "${caracter}" sin apertura.`
                };
            }

            const apertura = pila.pop();

            if (apertura !== parejas[caracter]) {
                return {
                    valida: false,
                    mensaje: `Error en la posición ${i + 1}: "${caracter}" no corresponde con "${apertura}".`
                };
            }
        }
    }

    if (pila.length > 0) {
        return {
            valida: false,
            mensaje: `Faltan ${pila.length} símbolo(s) de cierre.`
        };
    }

    return {
        valida: true,
        mensaje: "La secuencia está correctamente equilibrada."
    };
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Introduce una secuencia de paréntesis, corchetes y llaves: ", (secuencia) => {

    const resultado = analizarSecuencia(secuencia);

    if (resultado.valida) {
        console.log("✅ Secuencia correcta.");
    } else {
        console.log("❌ Secuencia incorrecta.");
    }

    console.log(resultado.mensaje);

    rl.close();
});
