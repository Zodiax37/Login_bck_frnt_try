// 📁 models/EmpleadoModel.js
const { getConnectionByRole, sql } = require("../connection");

async function getEmpleados(role) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query("EXEC sp_ListarEmpleados");
    return result.recordset;
}

async function getEmpleado(role, id) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerEmpleado @Id");
    return result.recordset[0];
}

async function postEmpleado(role, data) {
    const pool = await getConnectionByRole(role);
    const {
        Cedula, Correo, Direccion, Edad, FechaNac,
        PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Telefono,
        AreaDeTrabajo, Cargo, FechaIngreso
    } = data;

    await pool.request()
        .input("Cedula", sql.NVarChar, Cedula)
        .input("Correo", sql.NVarChar, Correo)
        .input("Direccion", sql.NVarChar, Direccion)
        .input("Edad", sql.Int, Edad)
        .input("FechaNac", sql.Date, FechaNac)
        .input("PrimerNombre", sql.NVarChar, PrimerNombre)
        .input("SegundoNombre", sql.NVarChar, SegundoNombre)
        .input("PrimerApellido", sql.NVarChar, PrimerApellido)
        .input("SegundoApellido", sql.NVarChar, SegundoApellido)
        .input("Telefono", sql.NVarChar, Telefono)
        .input("AreaDeTrabajo", sql.NVarChar, AreaDeTrabajo)
        .input("Cargo", sql.NVarChar, Cargo)
        .input("FechaIngreso", sql.Date, FechaIngreso)
        .query("EXEC sp_CrearEmpleado @Cedula, @Correo, @Direccion, @Edad, @FechaNac, @PrimerNombre, @SegundoNombre, @PrimerApellido, @SegundoApellido, @Telefono, @AreaDeTrabajo, @Cargo, @FechaIngreso");
}

async function updateEmpleado(role, id, personaId, data) {
    const pool = await getConnectionByRole(role);
    const {
        Cedula, Correo, Direccion, Edad, FechaNac,
        PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Telefono,
        AreaDeTrabajo, Cargo, FechaIngreso
    } = data;

    await pool.request()
        .input("EmpleadoId", sql.Int, id)
        .input("PersonaId", sql.Int, personaId)
        .input("Cedula", sql.NVarChar, Cedula)
        .input("Correo", sql.NVarChar, Correo)
        .input("Direccion", sql.NVarChar, Direccion)
        .input("Edad", sql.Int, Edad)
        .input("FechaNac", sql.Date, FechaNac)
        .input("PrimerNombre", sql.NVarChar, PrimerNombre)
        .input("SegundoNombre", sql.NVarChar, SegundoNombre)
        .input("PrimerApellido", sql.NVarChar, PrimerApellido)
        .input("SegundoApellido", sql.NVarChar, SegundoApellido)
        .input("Telefono", sql.NVarChar, Telefono)
        .input("AreaDeTrabajo", sql.NVarChar, AreaDeTrabajo)
        .input("Cargo", sql.NVarChar, Cargo)
        .input("FechaIngreso", sql.Date, FechaIngreso)
        .query("EXEC sp_ActualizarEmpleado @EmpleadoId, @PersonaId, @Cedula, @Correo, @Direccion, @Edad, @FechaNac, @PrimerNombre, @SegundoNombre, @PrimerApellido, @SegundoApellido, @Telefono, @AreaDeTrabajo, @Cargo, @FechaIngreso");
}

async function deleteEmpleado(role, id, personaId) {
    const pool = await getConnectionByRole(role);
    await pool.request()
        .input("EmpleadoId", sql.Int, id)
        .input("PersonaId", sql.Int, personaId)
        .query("EXEC sp_EliminarEmpleado @EmpleadoId, @PersonaId");
}

module.exports = { getEmpleados, getEmpleado, postEmpleado, updateEmpleado, deleteEmpleado };
