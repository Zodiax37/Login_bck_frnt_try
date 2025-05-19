const express = require("express");
const cors = require('cors');
const { getConnection, sql } = require("./connection");
const logRoutes = require('./routes/logRoutes');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use('/api', logRoutes)

app.get("/", async (req, res) => {
    try {
        const pool = await getConnection();
        // Prueba rápida: hacer una consulta simple
        const result = await pool.request().query("SELECT * from users");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send("Error en la base de datos");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
