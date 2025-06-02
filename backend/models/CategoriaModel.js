const {getConnection, sql} = require("../connection")

async function getCategorias(){
    const pool = await getConnection();
    const result = await pool.request().query("Select * from Categorias")
    return result.recordset;
}

async function getCategoria(id){
    const pool = await getConnection();
    const result = await pool.request().input("Id", sql.Int, id).query("Select * from Categorias Where Id = @Id")
    return result.recordset[0];
}

async function postCategoria(data){
    const pool = await getConnection();
    const {Nombre, Descripcion} = data
    await pool.request().input("Nombre", sql.VarChar, Nombre)
    .input("Descripcion", sql.Text, Descripcion)
    .query("Insert into Categorias (Nombre, Descripcion) values (@Nombre, @Descripcion)")
}

async function updateCategoria(id, data){
    const pool = await getConnection();
    const {Nombre, Descripcion} = data
    await pool.request().input("Id", sql.Int, id)
    .input("Nombre", sql.VarChar, Nombre)
    .input("Descripcion", sql.Text, Descripcion)
    .query("Update Categorias Set Nombre=@Nombre, Descripcion=@Descripcion Where Id=@Id")
} 

async function deleteCategoria(Id){
        const pool = await getConnection();
    await pool.request().input("Id", sql.Int, Id).query("Delete from Categorias Where Id=@Id")
}

module.exports={
    getCategoria, getCategorias, postCategoria, updateCategoria, deleteCategoria
}