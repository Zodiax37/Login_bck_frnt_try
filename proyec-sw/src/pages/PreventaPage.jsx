import { useEffect, useState } from 'react';
import { obtenerProductosDePreventa, confirmarVenta, quitarProductoPreventa } from '../api/preventas';

export default function PreventaPage() {
    const [productos, setProductos] = useState([]);
    const [preventaId, setPreventaId] = useState(localStorage.getItem('preventaId'));
    const [metodoPago, setMetodoPago] = useState('');
    const [numeroFactura, setNumeroFactura] = useState('');
    const [descuento, setDescuento] = useState(0);
    const [tipoFactura, setTipoFactura] = useState('');
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');

    // Cargar productos de la preventa
    useEffect(() => {
        if (!preventaId) return;
        const fetchData = async () => {
            try {
                const data = await obtenerProductosDePreventa(preventaId);
                setProductos(data);
            } catch (err) {
                alert('Error al cargar la preventa');
                console.error(err);
            }
        };
        fetchData();
    }, [preventaId]);

    // Calcular total
    const subtotal = productos.reduce((acc, p) => acc + p.Subtotal, 0);
    const totalFinal = subtotal - descuento;

    // Quitar producto de preventa
    const handleQuitarProducto = async (productoId) => {
        if (!window.confirm('¿Quitar este producto de la preventa?')) return;
        try {
            await quitarProductoPreventa({ preventaId, productoId });
            setProductos(productos.filter(p => p.ProductoId !== productoId));
        } catch (err) {
            alert('Error al quitar producto');
            console.error(err);
        }
    };

    // Confirmar venta
    const handleConfirmarVenta = async () => {
        if (!metodoPago || !numeroFactura || !tipoFactura) {
            alert('Completa todos los campos para confirmar la venta');
            return;
        }
        setLoading(true);
        try {
            await confirmarVenta({
                PreventaId: parseInt(preventaId),
                UsuarioId: parseInt(userId),
                MetodoPago: metodoPago,
                NumeroFactura: numeroFactura,
                Descuento: parseFloat(descuento),
                TipoFactura: tipoFactura
            });
            alert('Venta confirmada exitosamente');
            localStorage.removeItem('preventaId'); // Limpiar preventa actual
            setProductos([]);
        } catch (err) {
            alert('Error al confirmar venta');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!preventaId) return <p>No hay preventa activa.</p>;

    return (
        <div className="container mt-4">
            <h2>Carrito / Preventa</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.PreventaDetalleId}>
                            <td>{p.Nombre}</td>
                            <td>{p.Cantidad}</td>
                            <td>${p.PrecioVenta.toFixed(2)}</td>
                            <td>${p.Subtotal.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleQuitarProducto(p.ProductoId)}
                                >
                                    Quitar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {productos.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No hay productos en la preventa</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mb-3">
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)} <br />
                <strong>Descuento:</strong>{' '}
                <input
                    type="number"
                    min="0"
                    max={subtotal}
                    step="0.01"
                    value={descuento}
                    onChange={e => setDescuento(Number(e.target.value))}
                    className="form-control w-auto d-inline-block"
                    style={{ display: 'inline-block', width: '100px' }}
                />
                <br />
                <strong>Total a pagar:</strong> ${totalFinal.toFixed(2)}
            </div>

            <div className="mb-3">
                <label>Método de pago:</label>
                <input
                    type="text"
                    value={metodoPago}
                    onChange={e => setMetodoPago(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label>Número de factura:</label>
                <input
                    type="text"
                    value={numeroFactura}
                    onChange={e => setNumeroFactura(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label>Tipo de factura:</label>
                <input
                    type="text"
                    value={tipoFactura}
                    onChange={e => setTipoFactura(e.target.value)}
                    className="form-control"
                />
            </div>

            <button
                className="btn btn-success"
                disabled={productos.length === 0 || loading}
                onClick={handleConfirmarVenta}
            >
                {loading ? 'Procesando...' : 'Confirmar Venta'}
            </button>
        </div>
    );
}
