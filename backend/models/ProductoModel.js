const { getConnectionByRole, sql } = require("../connection");


async function getProductos(role) {
    const pool = await getConnectionByRole(role);
    const mostrarInactivos = role === 'admin' || role === 'inventario';
    const result = await pool
        .request()
        .input('MostrarInactivos', sql.Bit, mostrarInactivos ? 1 : 0)
        .query('EXEC sp_ListarProductos @MostrarInactivos');
    return result.recordset;
}


async function getProducto(role, id) {
    const pool = await getConnectionByRole(role);
    const result = await pool.request().input("Id", sql.Int, id).query("EXEC sp_TraerProducto @Id")
    return result.recordset[0];
}

async function postProducto(role, data) {
    const pool = await getConnectionByRole(role);
    const { Nombre, Descripcion, Costo, PrecioVenta, ImagenUrl,  CategoriaId, ProveedorId,CantidadInicial,UmbralMinimo } = data
    await pool.request().input("Nombre", sql.NVarChar, Nombre)
        .input("Descripcion", sql.Text, Descripcion)
        .input("Costo", sql.Decimal(10, 2), Costo)
        .input("PrecioVenta", sql.Decimal(10, 2), PrecioVenta)
        .input("ImgUrl", sql.NVarChar, ImagenUrl)
        .input("CategoriaId", sql.Int, CategoriaId)
        .input("ProveedorId", sql.Int, ProveedorId)
        .input("CantInit", sql.Int, CantidadInicial)
        .input("Umbral", sql.Int, UmbralMinimo)
        .query("EXEC sp_CrearProducto @Nombre, @Descripcion, @Costo, @PrecioVenta, @ImgUrl, @CategoriaId, @ProveedorId, @CantInit, @Umbral ")
}

async function updateProducto(role, id, data) {
    const pool = await getConnectionByRole(role);
    const { Nombre, Descripcion, Costo, PrecioVenta, ImagenURL, Estado, CategoriaId, ProveedorId, UmbralMinimo } = data;

await pool.request()
    .input("Id", sql.Int, id)
    .input("Nombre", sql.NVarChar, Nombre)
    .input("Descripcion", sql.Text, Descripcion)
    .input("Costo", sql.Decimal(10, 2), Costo)
    .input("PrecioVenta", sql.Decimal(10, 2), PrecioVenta)
    .input("ImgUrl", sql.NVarChar, ImagenURL)
    .input("Estado", sql.Bit, Estado)
    .input("CategoriaId", sql.Int, CategoriaId)
    .input("ProveedorId", sql.Int, ProveedorId)
    .input("UmbralMinimo", sql.Int, UmbralMinimo)
    .query("EXEC sp_ActualizarProducto @Id, @Nombre, @Descripcion, @Costo, @PrecioVenta, @ImgUrl, @Estado, @CategoriaId, @ProveedorId, @UmbralMinimo");
}


async function deleteProducto(role, id) {
    const pool = await getConnectionByRole(role);
    await pool.request().input("Id", sql.Int, id).query("EXEC sp_EliminarProducto @Id")
}


module.exports = {
    getProductos,
    getProducto,
    postProducto,
    updateProducto,
    deleteProducto
}