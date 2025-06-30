const { getConnectionByRole, sql } = require("../connection");

async function ventasPorFecha(role, fechaInicio, fechaFin) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("FechaInicio", sql.Date, fechaInicio)
        .input("FechaFin", sql.Date, fechaFin)
        .query("EXEC sp_ReporteVentasPorFecha @FechaInicio, @FechaFin");
    return result.recordset;
}

async function detalleVenta(role, ventaId) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("VentaId", sql.Int, ventaId)
        .query("EXEC sp_ConsultarDetalleVenta @VentaId");
    return result.recordset;
}

async function listadoVentas(role, fechaInicio, fechaFin) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("FechaInicio", sql.Date, fechaInicio)
        .input("FechaFin", sql.Date, fechaFin)
        .query("EXEC sp_ListadoVentas @FechaInicio, @FechaFin");
    return result.recordset;
}

async function ventasPorMetodoPago(role, fechaInicio, fechaFin, metodoPago) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("FechaInicio", sql.Date, fechaInicio)
        .input("FechaFin", sql.Date, fechaFin)
        .input("MetodoPago", sql.NVarChar, metodoPago)
        .query("EXEC sp_VentasPorMetodoPago @FechaInicio, @FechaFin, @MetodoPago");
    return result.recordset;
}

async function productosMasVendidos(role, fechaInicio, fechaFin) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request()
        .input("FechaInicio", sql.Date, fechaInicio)
        .input("FechaFin", sql.Date, fechaFin)
        .query("EXEC sp_ProductosMasVendidos @FechaInicio, @FechaFin");
    return result.recordset;
}

module.exports = {
    ventasPorFecha,
    detalleVenta,
    listadoVentas,
    ventasPorMetodoPago,
    productosMasVendidos
};