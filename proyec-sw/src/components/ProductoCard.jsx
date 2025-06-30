import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/ProductoCard.css';

import {
    crearPreventa,
    agregarProductoPreventa,
} from '../api/preventas';

export default function ProductoCard({ producto }) {
    const [cantidad, setCantidad] = useState(1);

    const rol = localStorage.getItem('rol');
    const userId = parseInt(localStorage.getItem('userId'), 10); // ⚠️ Asegúrate de guardar `userId` en login
    const esBajoMinimo = producto.CantidadActual <= producto.UmbralMinimo;

    const handleDarDeBaja = async () => {
        if (!window.confirm('¿Estás seguro de dar de baja este producto?')) return;
        try {
            const res = await fetch(`/api/productos/${producto.Id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!res.ok) throw new Error('Error al dar de baja');
            alert('Producto dado de baja');
            window.location.reload(); // o actualizar productos
        } catch (err) {
            console.error(err);
            alert('Error al dar de baja');
        }
    };

    const handleAgregarPreventa = async () => {
        try {
            let preventaId = localStorage.getItem('preventaId');

            if (!preventaId) {
                const res = await crearPreventa(userId);
                preventaId = res.preventaId;
                localStorage.setItem('preventaId', preventaId);
            }

            console.log({
                preventaId: parseInt(preventaId),
                productoId: producto.Id,
                cantidad: parseInt(cantidad),
            });/*aaaaaaaaaaaaaaa*/ 

            await agregarProductoPreventa({
                preventaId: parseInt(preventaId),
                productoId: producto.Id,
                cantidad: parseInt(cantidad),
            });

            alert('Producto añadido a preventa');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error al añadir a preventa');
        }
    };

    return (
        <div className="card shadow-sm h-100 border-0">
            <img
                src={producto.ImagenURL || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                className="card-img-top"
                alt={producto.Nombre}
                style={{ height: '200px', objectFit: 'contain' }}
            />
            <div className="card-body">
                <h5 className="card-title">{producto.Nombre}</h5>
                <p className="card-text text-muted">{producto.Descripcion?.slice(0, 80)}...</p>

                <ul className="list-unstyled small">
                    <li><strong>Precio:</strong> ${producto.PrecioVenta.toFixed(2)}</li>
                    <li><strong>Costo:</strong> ${producto.Costo.toFixed(2)}</li>
                    <li><strong>Categoría:</strong> {producto.CategoriaNombre}</li>
                    <li><strong>Proveedor:</strong> {producto.ProveedorNombre}</li>
                    <li>
                        <strong>Stock:</strong>{' '}
                        <span className={esBajoMinimo ? 'text-danger fw-bold' : 'text-success'}>
                            {producto.CantidadActual}
                        </span>
                    </li>
                </ul>

                <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                    <Link to={`/productos/editar/${producto.Id}`} className="btn btn-outline-primary btn-sm">
                        Editar
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleDarDeBaja}>
                        Dar de baja
                    </button>
                </div>

                {(rol === 'admin' || rol === 'ventas') && (
                    <div className="mt-3 d-flex align-items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            max={producto.CantidadActual}
                            className="form-control form-control-sm"
                            style={{ width: '70px' }}
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                        <button
                            className="btn btn-sm btn-success"
                            onClick={handleAgregarPreventa}
                            disabled={cantidad <= 0 || cantidad > producto.CantidadActual}
                        >
                            <i className="bi bi-cart-plus me-1" />
                            Añadir
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
