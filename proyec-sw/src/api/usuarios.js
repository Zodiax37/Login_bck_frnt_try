// src/api/usuarios.js
import API from './axios';

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
    const res = await API.get('/usuarios');
    return res.data;
};

export const obtenerUsuario = async (id) => {
    const res = await API.get(`/usuarios/${id}`);
    return res.data;
};

// Crear un nuevo usuario
export const crearUsuario = async (data) => {
    const res = await API.post('/usuarios', data);
    return res.data;
};

// Actualizar un usuario por ID
export const actualizarUsuario = async (id, data) => {
    const res = await API.put(`/usuarios/${id}`, data);
    return res.data;
};

// Eliminar (o desactivar) un usuario por ID
export const eliminarUsuario = async (id) => {
    const res = await API.delete(`/usuarios/${id}`);
    return res.data;
};
