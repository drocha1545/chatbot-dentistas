const { OpenAI } = require("langchain/llms/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
const fs = require("fs").promises;
require('dotenv').config();

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY
});

let escenarioGlobal = ''; // Variable global para mantener el escenario
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: llm, memory: memory });

async function cargarContextoInicial() {
    escenarioGlobal = await fs.readFile("./prompt.txt", "utf-8");
}

cargarContextoInicial().catch(console.error);

async function consultar(mensaje) {
    const promptCompleto = `${escenarioGlobal}\n${mensaje}`;
    const response = await chain.call({ input: promptCompleto });

    if (response && response.response) {
        return response.response;
    } else {
        console.error("La respuesta no tiene el formato esperado.");
        return "Lo siento, ocurrió un error.";
    }
}

async function crear_escenario() {
    return escenarioGlobal;
}

module.exports = {
    consultar,
    crear_escenario
};
