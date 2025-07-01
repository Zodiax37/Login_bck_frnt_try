import API from './axios';

// Obtener todos los proveedores
export const obtenerProveedores = async () => {
    const res = await API.get('/proveedores');
    return res.data;
};

// Obtener un proveedor por ID
export const obtenerProveedor = async (id) => {
    const res = await API.get(`/proveedores/${id}`);
    return res.data;
};

// Crear un nuevo proveedor
export const crearProveedor = async (data) => {
    const res = await API.post('/proveedores', data);
    return res.data;
};

// Actualizar un proveedor
export const actualizarProveedor = async (id, data) => {
    const res = await API.put(`/proveedores/${id}`, data);
    return res.data;
};

// Eliminar (o desactivar) un proveedor
export const eliminarProveedor = async (id) => {
    const res = await API.delete(`/proveedores/${id}`);
    return res.data;
};
