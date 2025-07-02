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



async function listarPreventasPendientes(role, usuarioId) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("userId", sql.Int, usuarioId)
        .query("EXEC sp_ListarPreventasPendientes @userId");
    return result.recordset;
}

async function deletePreventa(role, preventaId) {
    const pool = await getConnectionByRole(role)
    await pool.request().input("PreventaId", sql.Int, preventaId)
        .query("EXEC sp_EliminarPreventa @PreventaId");
}




async function getVentasGlobal(role, userId) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("userId", sql.Int, userId)
        .query('EXEC sp_ListadoVentasGlobal @userId');
    console.log(result);

    return result.recordset;
}

async function getVentasPorUser(role, usuarioId = null) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input('UsuarioId', sql.Int, usuarioId)
        .query('EXEC sp_ListadoVentasPorUsuario @UsuarioId');
    console.log(result);

    return result.recordset;
}



async function confirmarVenta(role, data) {
    const { PreventaId, UsuarioId, MetodoPago, Descuento, TipoFactura } = data;
    const pool = await getConnectionByRole(role);

    // Ejecutar procedimiento para confirmar la venta
    await pool.request()
        .input("PreventaId", sql.Int, PreventaId)
        .input("UsuarioId", sql.Int, UsuarioId)
        .input("MetodoPago", sql.NVarChar, MetodoPago)
        .input("Descuento", sql.Decimal(10, 2), Descuento)
        .input("TipoFactura", sql.NVarChar, TipoFactura)
        .query("EXEC sp_ConfirmarVenta @PreventaId, @UsuarioId, @MetodoPago, @Descuento, @TipoFactura");

    // Consultar notificaciones recientes para el usuario (últimos 5 minutos)
    const notificacionesResult = await pool.request()
        .input("UsuarioId", sql.Int, UsuarioId)
        .query(`
            SELECT TOP 5 N.Mensaje, P.Nombre AS NombreProducto, N.Fecha
            FROM Notificaciones N
            INNER JOIN Productos P ON P.Id = N.ProductoId
            WHERE N.UsuarioId = @UsuarioId
              AND N.Fecha >= DATEADD(MINUTE, -5, GETDATE())
            ORDER BY N.Fecha DESC
        `);

    const notificaciones = notificacionesResult.recordset;

    // Opcional: enviar correo si hay notificaciones
    if (notificaciones.length > 0) {
        const { enviarCorreoNotificacion } = require("../utils/email");
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const asunto = '📢 Alerta de Stock Bajo en Venta Confirmada';
        const mensajeHtml = `
            <h3>Se detectaron alertas de stock bajo tras confirmar una venta</h3>
            <ul>
                ${notificaciones.map(n => `<li><strong>${n.NombreProducto}</strong>: ${n.Mensaje} (Fecha: ${new Date(n.Fecha).toLocaleString()})</li>`).join('')}
            </ul>
        `;
        // Nota: enviar correo async sin await para no bloquear (o usar await si quieres)
        enviarCorreoNotificacion({ para: adminEmail, asunto, mensajeHtml }).catch(console.error);
    }

    return notificaciones; // retornar para que el controlador lo use y frontend lo reciba
}




module.exports = {
    crearPreventa,
    agregarProducto,
    quitarProducto,
    listarProductos,
    confirmarVenta
    , listarPreventasPendientes,
    getVentasPorUser,
    getVentasGlobal,
    deletePreventa
};
