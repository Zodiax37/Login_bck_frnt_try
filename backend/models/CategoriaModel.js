const {getConnectionByRole, sql} = require("../connection")

async function getCategorias(role){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query("EXEC sp_ListarCategorias")
    return result.recordset;
}

async function getCategoria(role, id){
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerCategoria @Id")
    return result.recordset[0];
}

async function postCategoria(role, data){
    const pool = await getConnectionByRole(role);
    const {Nombre, Descripcion} = data
    await pool.request().input("Nombre", sql.VarChar, Nombre)
    .input("Descripcion", sql.Text, Descripcion)
    .query("EXEC sp_CrearCategoria @Nombre, @Descripcion")
}

async function updateCategoria(role, id, data){
    const pool = await getConnectionByRole(role);
    const {Nombre, Descripcion} = data
    await pool.request().input("Id", sql.Int, id)
    .input("Nombre", sql.VarChar, Nombre)
    .input("Descripcion", sql.Text, Descripcion)
    .query("EXEC sp_ActualizarCategoria @Id, @Nombre, @Descripcion")
} 

async function deleteCategoria(role, Id){
        const pool = await getConnectionByRole(role);
    await pool.request().input("Id", sql.Int, Id).query("EXEC sp_EliminarCategoria @Id")
}

module.exports={
    getCategoria, getCategorias, postCategoria, updateCategoria, deleteCategoria
}