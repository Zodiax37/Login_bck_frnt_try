const {getConnectionByRole, sql} = require("../connection");
const bcrypt = require("bcryptjs");



async function getUsuarios(role){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query("EXEC sp_ListarUsuarios")
    return result.recordset;
}

async function getUsuario(role, id){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerUsuario @Id")
    return result.recordset[0];
}

/* @EmpleadoId INT,
    @Username NVARCHAR(50),
    @Password NVARCHAR(255),
    @Rol NVARCHAR(50)*/ 
async function postUsuario(role, data){
    const pool = await getConnectionByRole(role);

    const {EmpleadoId,Username, Password, Rol} = data

    
    const hash = await bcrypt.hash(Password, 10);
    await pool.request().input("EmpleadoId", sql.Int, EmpleadoId)
    .input("Username", sql.NVarChar, Username)
    .input("PasswordH", sql.NVarChar, hash)
    .input("Rol", sql.NVarChar, Rol)
    .query("EXEC sp_CrearUsuario @EmpleadoId, @Username, @PasswordH, @Rol")
}

async function updateUsuario(role, id, data){
    const pool = await getConnectionByRole(role);
    const {Username, Password, Rol, Estado,EmpleadoId} = data

    await pool.request().input("Id", sql.Int, id)
    .input("Username", sql.NVarChar, Username)
    .input("Password", sql.NVarChar, Password)
    .input("Rol", sql.NVarChar, Rol)
    .input("Estado", sql.Bit, Estado)
    .input("EmpleadoId", sql.Int, EmpleadoId)
    .query("EXEC sp_ActualizarUsuario @Id, @Username, @Password, @Rol, @Estado, @EmpleadoId")
} 

async function deleteUsuario(role, Id){
    const pool = await getConnectionByRole(role);
    await pool.request().input("Id", sql.Int, Id).query("EXEC sp_EliminarUsuario @Id")
}


module.exports ={
    getUsuarios, getUsuario, postUsuario,postUsuario,updateUsuario, deleteUsuario 
}