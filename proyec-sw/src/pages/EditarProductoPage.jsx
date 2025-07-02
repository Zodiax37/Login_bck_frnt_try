import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProducto, actualizarProducto } from '../api/productos';
import { obtenerCategorias } from '../api/categorias';
import { obtenerProveedores } from '../api/proveedores';

export default function EditarProductoPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Nombre: '',
        Descripcion: '',
        Costo: '',
        PrecioVenta: '',
        ImagenUrl: '',
        Estado: true,
        CategoriaId: '',
        ProveedorId: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        const cargarProducto = async () => {
            const data = await obtenerProducto(id);

            const productoNormalizado = {
            ...data,
            ImagenUrl: data.ImagenURL, // 
        };
            setForm(productoNormalizado);
        };
        const cargarListas = async () => {
            const [cats, provs] = await Promise.all([
                obtenerCategorias(),
                obtenerProveedores()
            ]);
            setCategorias(cats);
            setProveedores(provs);
        };
        cargarProducto();
        cargarListas();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarProducto(id, form);
            alert('Producto actualizado');
            navigate('/productos/catalogo');
        } catch (err) {
            console.error(err);
            alert('Error al actualizar el producto');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Editar Producto</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                        name="Nombre"
                        value={form.Nombre}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Precio Venta</label>
                    <input
                        name="PrecioVenta"
                        type="number"
                        value={form.PrecioVenta}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Costo</label>
                    <input
                        name="Costo"
                        type="number"
                        value={form.Costo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Umbral Minimo</label>
                    <input
                        name="UmbralMinimo"
                        type="number"
                        value={form.UmbralMinimo}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Categoría</label>
                    <select
                        name="CategoriaId"
                        value={form.CategoriaId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione...</option>
                        {categorias.map((cat) => (
                            <option key={cat.Id} value={cat.Id}>{cat.Nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Proveedor</label>
                    <select
                        name="ProveedorId"
                        value={form.ProveedorId}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione...</option>
                        {proveedores.map((prov) => (
                            <option key={prov.Id} value={prov.Id}>{prov.Nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="Descripcion"
                        value={form.Descripcion}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>


                <div className="col-md-6">
                    <label className="form-label">URL Imagen</label>
                    <input
                        name="ImagenUrl"
                        value={form.ImagenUrl}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    {form.ImagenUrl && (
                        <img
                            src={form.ImagenUrl}
                            alt="Vista previa"
                            className="img-thumbnail"
                            style={{ maxWidth: '120px', maxHeight: '120px' }}
                        />
                    )}
                </div>


                <div className="col-md-6 d-flex align-items-center">
                    <div className="form-check mt-4">
                        <input
                            type="checkbox"
                            name="Estado"
                            checked={form.Estado}
                            onChange={handleChange}
                            className="form-check-input"
                            id="estadoCheck"
                        />
                        <label className="form-check-label" htmlFor="estadoCheck">
                            Activo
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}
