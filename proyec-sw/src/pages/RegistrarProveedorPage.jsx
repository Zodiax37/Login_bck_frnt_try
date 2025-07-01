import React, { useState } from 'react';
import { crearProveedor } from '../api/proveedores';

const RegistrarProveedorPage = () => {
    const [form, setForm] = useState({
        Nombre: '',
        Contacto: '',
        Plataforma: '',
        Email: '',
        Direccion: '',
        Estado: 'Activo'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearProveedor(form);
            alert('Proveedor registrado correctamente');
            setForm({
                Nombre: '',
                Contacto: '',
                Plataforma: '',
                Email: '',
                Direccion: '',
                Estado: 'Activo'
            });
        } catch (error) {
            console.error(error);
            alert('Error al registrar proveedor');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Registrar Proveedor</h2>
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
                    <label className="form-label">Contacto</label>
                    <input
                        type="text"
                        name="Contacto"
                        value={form.Contacto}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Plataforma</label>
                    <input
                        type="text"
                        name="Plataforma"
                        value={form.Plataforma}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={form.Email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <textarea
                        name="Direccion"
                        value={form.Direccion}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarProveedorPage;
