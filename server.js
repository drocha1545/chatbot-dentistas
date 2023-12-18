const express = require('express');
const { consultar, crear_escenario } = require('./memoria');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Habilita el parseo de JSON en el cuerpo de las solicitudes

app.get('/escenario', async (req, res) => {
    try {
        const escenario = await crear_escenario();
        res.json({ escenario });
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el escenario' });
    }
});

app.post('/consultar', async (req, res) => {
    try {
        const { mensaje } = req.body;
        const respuesta = await consultar(mensaje);
        res.json({ respuesta });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
