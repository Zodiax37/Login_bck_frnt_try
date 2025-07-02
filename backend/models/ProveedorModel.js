const { getConnectionByRole, sql } = require("../connection");

async function getProovedores(role){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query("EXEC sp_ListarProveedores")
    return result.recordset
}

async function getProovedor(role, id){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerProveedor @Id")
    return result.recordset[0];
}

async function postProveedor(role, data){
    const pool = await getConnectionByRole(role);
    const {Contacto, Estado, Nombre, Plataforma, Email, Direccion} = data
    await pool.request().input("Contacto",sql.NVarChar,Contacto)
    .input("Estado",sql.NVarChar , Estado)
    .input("Nombre", sql.NVarChar, Nombre)
    .input("Plataforma",sql.NVarChar,Plataforma)
    .input("Email", sql.NVarChar, Email)
    .input("Direccion", sql.Text, Direccion)
    .query("EXEC sp_CrearProveedor @Nombre, @Contacto, @Plataforma, @Email, @Direccion")
} 

async function updateProveedor(role, Id, data){
    const pool = await getConnectionByRole(role);
    const { Contacto, Nombre, Plataforma, Email, Direccion } = data;
    await pool.request().input("Id", sql.Int, Id)
    .input("Contacto",sql.NVarChar,Contacto)
    .input("Nombre", sql.NVarChar, Nombre)
    .input("Plataforma",sql.NVarChar,Plataforma)
    .input("Email", sql.NVarChar, Email)
    .input("Direccion", sql.Text, Direccion)
    .query("EXEC sp_ActualizarProveedor @Id, @Nombre, @Contacto, @Plataforma, @Email, @Direccion")
} 


async function inactiveProveedor(role, id){
    const pool = await getConnectionByRole(role);
    await pool.request().input("Id", sql.Int, id).query("sp_EliminarProveedor @Id")
}


module.exports = {
    getProovedores,
    getProovedor,
    postProveedor,
    updateProveedor,
    inactiveProveedor
}