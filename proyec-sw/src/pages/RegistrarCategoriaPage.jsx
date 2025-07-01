import React, { useState } from 'react';
import { crearCategoria } from '../api/categorias';

const RegistrarCategoriaPage = () => {
  const [form, setForm] = useState({
    Nombre: '',
    Descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCategoria(form);
      alert('Categoría registrada correctamente');
      setForm({ Nombre: '', Descripcion: '' });
    } catch (error) {
      console.error(error);
      alert('Error al registrar la categoría');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registrar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="Descripcion"
            value={form.Descripcion}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarCategoriaPage;
