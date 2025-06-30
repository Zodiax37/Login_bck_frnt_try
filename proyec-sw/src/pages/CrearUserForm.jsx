import React, { useState } from 'react';
import { crearUsuario, actualizarUsuario, obtenerUsuarios } from '../api/usuarios';

function CrearUsuario() {
    const [form, setForm] = useState({
        EmpleadoId: '',
        Username: '',
        Password: '',
        Rol: '',
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMensaje('');
        setError('');
        try {
            await crearUsuario({
                EmpleadoId: parseInt(form.EmpleadoId),
                Username: form.Username,
                Password: form.Password,
                Rol: form.Rol,
            });
            setMensaje('Usuario creado correctamente');
            setForm({ EmpleadoId: '', Username: '', Password: '', Rol: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="EmpleadoId" value={form.EmpleadoId} onChange={handleChange} placeholder="Empleado ID" type="number" required />
                <input name="Username" value={form.Username} onChange={handleChange} placeholder="Usuario" required />
                <input name="Password" value={form.Password} onChange={handleChange} placeholder="Contraseña" type="password" required />
                <input name="Rol" value={form.Rol} onChange={handleChange} placeholder="Rol (admin, ventas, inventario)" required />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
