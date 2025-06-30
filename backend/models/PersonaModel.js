const { getConnectionByRole, sql } = require("../connection");


async function getPersonas(role){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query("EXEC sp_ListarPersonas")
    return result.recordset;
}

async function getPersona(role, id){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerPersona @Id")
    return result.recordset[0];
}


/*
    @Cedula NVARCHAR(20),
    @Correo NVARCHAR(100),
    @Direccion NVARCHAR(255),
    @Edad INT,
    @FechaNac DATE,
    @PrimerNombre NVARCHAR(50),
    @SegundoNombre NVARCHAR(50) = NULL,
    @PrimerApellido NVARCHAR(50),
    @SegundoApellido NVARCHAR(50) = NULL,
    @Telefono NVARCHAR(20),
	@PersonId INT OUTPUT*/

async function postPersona(role, data){
    const pool = await getConnectionByRole(role);
    const {Cedula, Correo, Direccion, Edad, FechaNac, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Telefono} = data
    await pool.request().input("Cedula", sql.NVarChar, Cedula)
    .input("Correo",sql.NVarChar, Correo)
    .input("Direccion",sql.NVarChar, Direccion)
    .input("Edad",sql.Int, Edad)
    .input("FechaNac",sql.Date, FechaNac)
    .input("PrimerNombre",sql.NVarChar, PrimerNombre)
    .input("SegundoNombre",sql.NVarChar, SegundoNombre)
    .input("PrimerApellido",sql.NVarChar, PrimerApellido)
    .input("SegundoApellido",sql.NVarChar,SegundoApellido)
    .input("Telefono",sql.NVarChar, Telefono)
    .query("EXEC sp_CrearPersona @Cedula, @Correo, @Direccion, @Edad, @FechaNac, @PrimerNombre, @SegundoNombre, @PrimerApellido, @SegundoApellido, @Telefono")
}

async function updatePersona(role, id, data){
    const pool = await getConnectionByRole(role);
    const {Cedula, Correo, Direccion, Edad, FechaNac, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Telefono} = data
    await pool.request().input("Id", sql.Int, id)
    .input("Cedula", sql.NVarChar, Cedula)
    .input("Correo",sql.NVarChar, Correo)
    .input("Direccion",sql.NVarChar, Direccion)
    .input("Edad",sql.Int, Edad)
    .input("FechaNac",sql.Date, FechaNac)
    .input("PrimerNombre",sql.NVarChar, PrimerNombre)
    .input("SegundoNombre",sql.NVarChar, SegundoNombre)
    .input("PrimerApellido",sql.NVarChar, PrimerApellido)
    .input("SegundoApellido",sql.NVarChar,SegundoApellido)
    .input("Telefono",sql.NVarChar, Telefono)
    .query("EXEC sp_ActualizarPersona @Id, @Cedula, @Correo, @Direccion, @Edad, @FechaNac, @PrimerNombre, @SegundoNombre, @PrimerApellido, @SegundoApellido, @Telefono")
} 

async function deletePersona(role, Id){
        const pool = await getConnectionByRole(role);
    await pool.request().input("Id", sql.Int, Id).query("EXEC sp_EliminarPersona @Id")
}

module.exports ={getPersona, getPersonas, postPersona, updatePersona, deletePersona}