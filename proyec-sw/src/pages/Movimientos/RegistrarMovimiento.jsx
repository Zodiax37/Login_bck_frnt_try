import React, { useEffect, useState } from "react";
import { RegistrarMovimiento } from "../../api/existencias";
import { obtenerProductos } from "../../api/productos";

const RegistrarMovimientoPage = () => {
    const [form, setForm] = useState({
        ProductoId: "",
        TipoMovimiento: "Entrada",
        Cantidad: "",
        Comentario: "",
        UsuarioId: localStorage.getItem("userId"),
    });

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await obtenerProductos();
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar productos", error);
            }
        };
        cargarProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectProducto = (producto) => {
        setForm((prev) => ({ ...prev, ProductoId: producto.Id }));
        setProductoSeleccionado(producto);
        setBusqueda("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RegistrarMovimiento(form);
            alert("Movimiento registrado correctamente");
            setForm({
                ProductoId: "",
                TipoMovimiento: "Entrada",
                Cantidad: "",
                Comentario: "",
                UsuarioId: 1,
            });
            setProductoSeleccionado(null);
        } catch (error) {
            alert("Error al registrar el movimiento");
            console.error(error);
        }
    };

    const productosFiltrados = productos.filter((p) =>
        p.Nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Registrar Movimiento</h3>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
                <div className="mb-3 position-relative">
                    <label className="form-label">Buscar Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe el nombre del producto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    {busqueda && (
                        <ul className="list-group position-absolute w-100 z-3 mt-1" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {productosFiltrados.length > 0 ? (
                                productosFiltrados.map((p) => (
                                    <li
                                        key={p.Id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleSelectProducto(p)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {p.Nombre} — <small className="text-muted">{p.Categoria}</small>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">No se encontró</li>
                            )}
                        </ul>
                    )}
                </div>

                {productoSeleccionado && (
                    <div className="mb-3">
                        <strong>Producto seleccionado:</strong>{" "}
                        <span className="badge bg-primary">{productoSeleccionado.Nombre}</span>
                        <input type="hidden" name="ProductoId" value={form.ProductoId} />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Tipo de Movimiento</label>
                    <select
                        name="TipoMovimiento"
                        value={form.TipoMovimiento}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="Entrada">Entrada</option>
                        <option value="Salida">Salida</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <div className="input-group">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    Cantidad: Math.max(0, parseInt(prev.Cantidad || 0) - 1),
                                }))
                            }
                        >
                            -
                        </button>
                        <input
                            type="number"
                            name="Cantidad"
                            value={form.Cantidad}
                            onChange={handleChange}
                            className="form-control text-center"
                            min="0"
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    Cantidad: parseInt(prev.Cantidad || 0) + 1,
                                }))
                            }
                        >
                            +
                        </button>
                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label">Comentario</label>
                    <textarea
                        name="Comentario"
                        value={form.Comentario}
                        onChange={handleChange}
                        className="form-control"
                        rows={2}
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Registrar Movimiento
                </button>
            </form>
        </div>
    );
};

export default RegistrarMovimientoPage;
