const readline = require("readline");
const { consultar, crear_escenario } = require("./memoria"); // Importa ambas funciones aquí

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function iniciarConversacion() {
    
    const escenario = await crear_escenario();

    rl.question("Tú: ", async (input) => {
       
        const inputConContexto = escenario + "\n" + input;

        if (input.toLowerCase() === "salir") {
            console.log("Terminando la conversación...");
            rl.close();
        } else {
            await consultar(inputConContexto);
            iniciarConversacion();
        }
    });
}

iniciarConversacion();
