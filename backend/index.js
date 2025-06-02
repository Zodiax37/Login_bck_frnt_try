const express = require("express");
const cors = require('cors');
const { getConnection, sql } = require("./connection");

const app = express();
const PORT = 3000;


//Rutas

const logRoutes = require('./routes/logRoutes');
const ProovRoutes = require('./routes/ProovedorRoutes')
const CategoryRoutes = require('./routes/CategoriaRoutes')
const ProdRoutes = require('./routes/ProductoRoutes')

const ExistRoutes = require('./routes/ExistenciaRoutes')

//Dependencias de la app/api
app.use(cors())
app.use(express.json())
app.use('/api', logRoutes)
app.use('/api/proveedores', ProovRoutes)
app.use('/api/categorias', CategoryRoutes)
app.use('/api/productos', ProdRoutes)
app.use('/api/existencias', ExistRoutes)

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
