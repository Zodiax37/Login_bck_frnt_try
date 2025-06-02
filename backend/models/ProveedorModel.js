const { getConnection, sql } = require("../connection");

async function getProovedores(){
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Proveedores")
    return result.recordset
}

async function getProovedor(id){
    const pool = await getConnection();
    const result = await pool.request().input("Id", sql.Int, id).query("SELECT * FROM Proveedores WHERE Id = @Id")
    return result.recordset[0];
}

async function postProveedor(data){
    const pool = await getConnection();
    const {Contacto, Estado, Nombre} = data
    await pool.request().input("Contacto",sql.VarChar,Contacto)
    .input("Estado",sql.VarChar , Estado)
    .input("Nombre", sql.VarChar, Nombre)
    .query("INSERT INTO Proveedores (Contacto, Estado, Nombre) values (@Contacto, @Estado, @Nombre)")
} 

async function updateProveedor(Id, data){
    const pool = await getConnection();
    const {Contacto, Estado, Nombre} = data
    await pool.request().input("Id", sql.Int, Id)
    .input("Contacto",sql.VarChar,Contacto)
    .input("Estado",sql.VarChar , Estado)
    .input("Nombre", sql.VarChar, Nombre)
    .query("Update Proveedores SET Contacto=@Contacto, Estado= @Estado, Nombre=@Nombre WHERE Id = @Id")
} 


async function inactiveProveedor(id){
    const pool = await getConnection();
    await pool.request().input("Id", sql.Int, id).query("UPDATE Proveedores Set Estado ='Inactivo' WHERE Id=@Id")
}


module.exports = {
    getProovedores,
    getProovedor,
    postProveedor,
    updateProveedor,
    inactiveProveedor
}