const { getConnectionByRole, sql } = require("../connection");
const { get } = require("../routes/logRoutes");



async function getMovimientos(role) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request().query('EXEC sp_ListarMovimientosInventario');
    return result.recordset;
}





async function getMovimiento(role, id) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query('EXEC sp_TraerMovimientoInventario @Id');
    return result.recordset;
}

async function postMovimiento(role, data) {
    const { ProductoId, TipoMovimiento, Cantidad, Comentario, UsuarioId } = data;

    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("ProductoId", sql.Int, ProductoId)
        .input("TipoMovimiento", sql.NVarChar, TipoMovimiento)
        .input("Cantidad", sql.Int, Cantidad)
        .input("Comentario", sql.NVarChar, Comentario)
        .input("UsuarioId", sql.Int, UsuarioId)
        .query("EXEC sp_RegistrarMovimientoInventario @ProductoId, @TipoMovimiento, @Cantidad, @Comentario, @UsuarioId");

    // Luego del SP, buscar si se creó una notificación
    const notificaciones = await pool.request()
        .input("ProductoId", sql.Int, ProductoId)
        .query(`
      SELECT TOP 1 N.Mensaje, P.Nombre AS NombreProducto
      FROM Notificaciones N
      INNER JOIN Productos P ON P.Id = N.ProductoId
      WHERE ProductoId = @ProductoId
      ORDER BY N.Id DESC
    `);

    return notificaciones.recordset[0] || null; // null si no se creó notificación
}

module.exports = {
    getMovimientos, postMovimiento, getMovimiento
};














//#region

// async function getExistencias(){
//     const pool = await getConnection();
//     const result = await pool.request().query("select * from Existencias")
//     return result.recordset;

// }

// async function getExistencia(id){
//     const pool = await getConnection();
//     const result = await pool.request().input("Id", sql.Int, id).query("select * from Existencias where Id = @Id")
//     return result.recordset[0]
// }

// async function postExistencia(data){
//     const pool = await getConnection();
//     const {ProductoId, CantidadActual, UmbralMinimo} = data;
//     await pool.request().input("ProductoId", sql.Int, ProductoId)
//     .input("CantidadActual", sql.Int, CantidadActual)
//     .input("UmbralMinimo", sql.Int, UmbralMinimo)
//     .query("insert into Existencias (ProductoId,CantidadActual,UmbralMinimo) values (@ProductoId, @CantidadActual, @UmbralMinimo)")
// }


// async function updateExistencia(id, data){
//     const pool = await getConnection();
//     const {ProductoId, CantidadActual, UmbralMinimo} = data;
//     await pool.request().input("Id", sql.Int, id).input("ProductoId", sql.Int, ProductoId)
//     .input("CantidadActual", sql.Int, CantidadActual)
//     .input("UmbralMinimo", sql.Int, UmbralMinimo)
//     .query("Update Proveedores SET ProdcutoId=@ProductoId, CantidadActual=@CantidadActual, UmbralMinimo=@UmbralMinimo Where Id= @Id")
// }

// async function deleteExistencia(id) {
//     const pool = getConnection();
//     await pool.request().input("Id", sql.Int, id).query("Delete from Existencias Where Id = @Id")
// }

// module.exports={
//     getExistencias, getExistencia, postExistencia, updateExistencia, deleteExistencia
// }
//#endregion