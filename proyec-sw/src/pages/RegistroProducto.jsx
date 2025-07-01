import React, { useEffect, useState } from 'react';
import { crearProducto } from '../api/productos';
import { obtenerCategorias } from '../api/categorias';
import { obtenerProveedores } from '../api/proveedores';
import { useNavigate } from 'react-router-dom';

const RegistrarProductoPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Nombre: '',
    Descripcion: '',
    Costo: '',
    PrecioVenta: '',
    ImagenUrl: '',
    CategoriaId: '',
    ProveedorId: '',
    CantidadInicial: '',
    UmbralMinimo: ''
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cat = await obtenerCategorias();
        const prov = await obtenerProveedores();
        setCategorias(cat);
        setProveedores(prov);
      } catch (e) {
        console.error('Error cargando categorías/proveedores:', e);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto(form);
      alert('Producto registrado correctamente');
      navigate('/productos/catalogo'); // O donde quieras redirigir
    } catch (error) {
      console.error(error);
      alert('Error al registrar producto');
    }
  };

  return (
    <div className="row container mt-4 justify-content-center">
      <div className='col-8'>

        <h2 className="mb-4">Registrar Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" name="Nombre" value={form.Nombre} onChange={handleChange} className="form-control" required />
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea name="Descripcion" value={form.Descripcion} onChange={handleChange} className="form-control" />
          </div>


          <div className='d-flex  align-content-center gap-3'>

            {/* Costo */}
            <div className="mb-3 me-5">
              <label className="form-label">Costo</label>
              <input type="number" step="0.01" name="Costo" value={form.Costo} onChange={handleChange} className="form-control" required />
            </div>

            {/* Precio de venta */}
            <div className="mb-3 ms-5">
              <label className="form-label">Precio de Venta</label>
              <input type="number" step="0.01" name="PrecioVenta" value={form.PrecioVenta} onChange={handleChange} className="form-control" required />
            </div>
          </div>

          {/* Imagen */}
          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input type="text" name="ImagenUrl" value={form.ImagenUrl} onChange={handleChange} className="form-control" />
          </div>


          <div className='d-flex  align-content-center gap-3'>
            {/* Categoría */}
            <div className="mb-3 me-5">
              <label className="form-label d-flex justify-content-between">
                <span>Categoría</span>
                <button type="button" className="btn btn-sm btn-outline-primary me-5" onClick={() => navigate('/categorias/registrar')}>
                  + Añadir Categoría
                </button>
              </label>
              <select name="CategoriaId" value={form.CategoriaId} onChange={handleChange} className="form-select" required>
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.Id} value={cat.Id}>{cat.Nombre}</option>
                ))}
              </select>
            </div>

            {/* Proveedor */}
            <div className="mb-3" ms-5>
              <label className="form-label d-flex justify-content-between">
                <span>Proveedor</span>
                <button type="button" className="btn btn-sm btn-outline-primary ms-5" onClick={() => navigate('/proveedores/registrar')}>
                  + Añadir Proveedor
                </button>
              </label>
              <select name="ProveedorId" value={form.ProveedorId} onChange={handleChange} className="form-select" required>
                <option value="">Selecciona un proveedor</option>
                {proveedores.map(p => (
                  <option key={p.Id} value={p.Id}>{p.Nombre}</option>
                ))}
              </select>
            </div>

          </div>


          {/* Cantidad inicial */}
          <div className="mb-3">
            <label className="form-label">Cantidad Inicial</label>
            <input type="number" name="CantidadInicial" value={form.CantidadInicial} onChange={handleChange} className="form-control" required />
          </div>

          {/* Umbral mínimo */}
          <div className="mb-3">
            <label className="form-label">Umbral Mínimo</label>
            <input type="number" name="UmbralMinimo" value={form.UmbralMinimo} onChange={handleChange} className="form-control" required />
          </div>

          <button type="submit" className="btn btn-success">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarProductoPage;
