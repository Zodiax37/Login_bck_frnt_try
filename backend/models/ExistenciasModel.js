const { getConnection, sql } = require("../connection");
const { get } = require("../routes/logRoutes");


async function getExistencias(){
    const pool = await getConnection();
    const result = await pool.request().query("select * from Existencias")
    return result.recordset;

}

async function getExistencia(id){
    const pool = await getConnection();
    const result = await pool.request().input("Id", sql.Int, id).query("select * from Existencias where Id = @Id")
    return result.recordset[0]
}

async function postExistencia(data){
    const pool = await getConnection();
    const {ProductoId, CantidadActual, UmbralMinimo} = data;
    await pool.request().input("ProductoId", sql.Int, ProductoId)
    .input("CantidadActual", sql.Int, CantidadActual)
    .input("UmbralMinimo", sql.Int, UmbralMinimo)
    .query("insert into Existencias (ProductoId,CantidadActual,UmbralMinimo) values (@ProductoId, @CantidadActual, @UmbralMinimo)")
}


async function updateExistencia(id, data){
    const pool = await getConnection();
    const {ProductoId, CantidadActual, UmbralMinimo} = data;
    await pool.request().input("Id", sql.Int, id).input("ProductoId", sql.Int, ProductoId)
    .input("CantidadActual", sql.Int, CantidadActual)
    .input("UmbralMinimo", sql.Int, UmbralMinimo)
    .query("Update Proveedores SET ProdcutoId=@ProductoId, CantidadActual=@CantidadActual, UmbralMinimo=@UmbralMinimo Where Id= @Id")
}

async function deleteExistencia(id) {
    const pool = getConnection();
    await pool.request().input("Id", sql.Int, id).query("Delete from Existencias Where Id = @Id")
}

module.exports={
    getExistencias, getExistencia, postExistencia, updateExistencia, deleteExistencia
}