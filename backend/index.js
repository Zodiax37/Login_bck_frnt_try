const express = require("express");
const cors = require('cors');
require('dotenv').config();


const { getConnectionByRole, sql } = require("./connection");

const app = express();
const PORT = 3000;


//Rutas

const logRoutes = require('./routes/logRoutes');
const ProovRoutes = require('./routes/ProovedorRoutes')
const CategoryRoutes = require('./routes/CategoriaRoutes')
const ProdRoutes = require('./routes/ProductoRoutes')
const ExistRoutes = require('./routes/ExistenciaRoutes')
const EmpleadoRoutes = require("./routes/EmpleadoRoutes")
const PersonaRoutes = require("./routes/PersonaRoutes")
const PreventaRoutes = require("./routes/PreventaRoutes")
const ReporteRoutes = require("./routes/ReportesRoutes")
const UsuarioRoutes = require("./routes/UsuarioRoutes")



//Dependencias de la app/api
app.use(cors())
app.use(express.json())
app.use('/api', logRoutes)
app.use('/api/proveedores', ProovRoutes)
app.use('/api/categorias', CategoryRoutes)
app.use('/api/productos', ProdRoutes)

app.use('/api/empleados', EmpleadoRoutes)
app.use('/api/personas', PersonaRoutes)
app.use('/api/preventas', PreventaRoutes)
app.use('/api/reportes', ReporteRoutes)
app.use('/api/existencias', ExistRoutes)
app.use('/api/usuarios', UsuarioRoutes)

//FALTA PONER BIEN LOS ROLES DE VENTA, INV, ADMIN Y CREARLES EN SQL
app.get("/", async (req, res) => {
    try {
        const pool = await getConnectionByRole('ventas');
        // Prueba rápida: hacer una consulta simple
        const result = await pool.request().query("SELECT * from Usuarios");
        // console.log("sepudo");
        
        res.json(result.recordset);
    } catch (error) {
        console.error("Error en ruta /:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
