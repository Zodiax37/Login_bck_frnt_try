import React, { useEffect, useState } from "react";
import { obtenerExistencias } from "../../api/existencias"; // ajusta el path según tu estructura

const ListaMovimientosInventario = () => {
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
        const cargarMovimientos = async () => {
            try {
                const data = await obtenerExistencias();
                setMovimientos(data);
            } catch (error) {
                console.error("Error al cargar movimientos:", error);
            }
        };
        cargarMovimientos();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Movimientos de Inventario</h2>
            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {movimientos.map((m) => (
                        <tr key={m.Id}>
                            <td>{m.Id}</td>
                            <td>{m.NombreProducto}</td>
                            <td>{m.Categoria}</td>
                            <td>{m.TipoMovimiento}</td>
                            <td>{m.Cantidad}</td>
                            <td>{new Date(m.FechaMovimiento).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaMovimientosInventario;
