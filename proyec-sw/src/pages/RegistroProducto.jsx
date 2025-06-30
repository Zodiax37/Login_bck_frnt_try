import { useState } from 'react';

export default function RegistroProducto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    costo: '',
    categoria: '',
    proveedor: '',
    descripcion: ''
  });

  const [error, setError] = useState('');

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const { nombre, precio, costo } = formulario;

    if (!nombre || !precio || !costo) {
      setError('Todos los campos obligatorios deben completarse.');
      return;
    }

    if (precio <= 0 || costo <= 0) {
      setError('El precio y el costo deben ser positivos.');
      return;
    }

    setError('');
    alert('Producto registrado correctamente.');
    console.log('Datos enviados:', formulario);
    // Futuro: axios.post('/api/productos', formulario)
  };

  return (
    <div className="container p-4">
      <h2>Registrar Producto</h2>

      <form onSubmit={manejarEnvio} className="row g-3 bg-light p-4 rounded shadow-sm">
        <div className="col-md-6">
          <label>Nombre</label>
          <input type="text" className="form-control" name="nombre" value={formulario.nombre} onChange={manejarCambio} />
        </div>
        <div className="col-md-3">
          <label>Precio</label>
          <input type="number" className="form-control" name="precio" value={formulario.precio} onChange={manejarCambio} />
        </div>
        <div className="col-md-3">
          <label>Costo</label>
          <input type="number" className="form-control" name="costo" value={formulario.costo} onChange={manejarCambio} />
        </div>
        <div className="col-md-6">
          <label>Categoría</label>
          <input type="text" className="form-control" name="categoria" value={formulario.categoria} onChange={manejarCambio} />
        </div>
        <div className="col-md-6">
          <label>Proveedor</label>
          <input type="text" className="form-control" name="proveedor" value={formulario.proveedor} onChange={manejarCambio} />
        </div>
        <div className="col-12">
          <label>Descripción</label>
          <textarea className="form-control" name="descripcion" value={formulario.descripcion} onChange={manejarCambio} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
    </div>
  );
}
