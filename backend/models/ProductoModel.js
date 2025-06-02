const { getConnection, sql } = require("../connection");


async function getProductos(){
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Productos")
    return result.recordset
}

async function getProducto(id){
    const pool = await getConnection();
    const result = await pool.request().input("Id", sql.Int, id).query("SELECT * FROM Productos WHERE Id = @Id")
    return result.recordset[0];
}

async function postProducto(data){
    const pool = await getConnection();
    const {Nombre, Costo, PrecioVenta, CategoriaId, ProveedorId} = data
    await pool.request().input("Nombre",sql.VarChar,Nombre)
    .input("Costo",sql.Decimal(10,2) , Costo)
    .input("PrecioVenta", sql.Decimal(10,2),PrecioVenta)
    .input("CategoriaId", sql.Int,CategoriaId)
    .input("ProveedorId", sql.Int,ProveedorId)
    .query("INSERT INTO Productos (Nombre, Costo, PrecioVenta, CategoriaId, ProveedorId) values (@Nombre, @Costo, @PrecioVenta, @CategoriaId, @ProveedorId)")
} 

async function updateProducto(id, data){
    const pool = await getConnection();
    const {Nombre, Costo, PrecioVenta, CategoriaId, ProveedorId} = data
    await pool.request().input("Id", sql.Int, id)
    .input("Nombre",sql.VarChar,Nombre)
    .input("Costo",sql.Decimal(10, 2) , Costo)
    .input("PrecioVenta", sql.Decimal(10, 2),PrecioVenta)
    .input("CategoriaId", sql.Int,CategoriaId)
    .input("ProveedorId", sql.Int,ProveedorId)
    .query("Update Productos SET Nombre=@Nombre, Costo= @Costo, PrecioVenta=@PrecioVenta, CategoriaId=@CategoriaId, ProveedorId=@ProveedorId  WHERE Id = @Id")
} 


async function deleteProducto(id){
    const pool = await getConnection();
    await pool.request().input("Id", sql.Int, id).query("Delete from Productos WHERE Id=@Id")
}


module.exports = {
    getProductos,
    getProducto,
    postProducto,
    updateProducto,
    deleteProducto
}