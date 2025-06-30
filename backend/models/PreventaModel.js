const { getConnectionByRole, sql } = require("../connection");

async function crearPreventa(role, usuarioId) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("UsuarioId", sql.Int, usuarioId)
        .query("EXEC sp_CrearPreventa @UsuarioId");
    return result.recordset[0].PreventaId;
}

async function agregarProducto(role, preventaId, productoId, cantidad) {
    const pool = await getConnectionByRole(role);
    await pool.request()
        .input("PreventaId", sql.Int, preventaId)
        .input("ProductoId", sql.Int, productoId)
        .input("Cantidad", sql.Int, cantidad)
        .query("EXEC sp_AgregarProductoPreventa @PreventaId, @ProductoId, @Cantidad");
}

async function quitarProducto(role, preventaId, productoId) {
    const pool = await getConnectionByRole(role);
    await pool.request()
        .input("PreventaId", sql.Int, preventaId)
        .input("ProductoId", sql.Int, productoId)
        .query("EXEC sp_QuitarProductoPreventa @PreventaId, @ProductoId");
}

async function listarProductos(role, preventaId) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("PreventaId", sql.Int, preventaId)
        .query("EXEC sp_ListarProductosDePreventa @PreventaId");
    return result.recordset;
}

async function confirmarVenta(role, datos) {
    const { PreventaId, UsuarioId, MetodoPago, NumeroFactura, Descuento, TipoFactura } = datos;
    const pool = await getConnectionByRole(role);
    await pool.request()
        .input("PreventaId", sql.Int, PreventaId)
        .input("UsuarioId", sql.Int, UsuarioId)
        .input("MetodoPago", sql.NVarChar, MetodoPago)
        .input("NumeroFactura", sql.NVarChar, NumeroFactura)
        .input("Descuento", sql.Decimal(10, 2), Descuento)
        .input("TipoFactura", sql.NVarChar, TipoFactura)
        .query("EXEC sp_ConfirmarVenta @PreventaId, @UsuarioId, @MetodoPago, @NumeroFactura, @Descuento, @TipoFactura");
}

module.exports = {
    crearPreventa,
    agregarProducto,
    quitarProducto,
    listarProductos,
    confirmarVenta
};
