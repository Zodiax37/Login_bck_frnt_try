
import API from './axios';

export const obtenerProductos = async () => {
    const res = await API.get(`/productos`);
    return res.data;
};



export const obtenerProducto = async (id) => {
    const res = await API.get(`/productos/${id}`);
    return res.data;
};

// Crear un nuevo usuario
export const crearProducto = async (data) => {
    const res = await API.post('/productos', data);
    return res.data;
};

// Actualizar un usuario por ID
export const actualizarProducto = async (id, data) => {
    const res = await API.put(`/productos/${id}`, data);
    return res.data;
};

// Eliminar (o desactivar) un usuario por ID
export const eliminarProducto = async (id) => {
    const res = await API.delete(`/productos/${id}`);
    return res.data;
};
