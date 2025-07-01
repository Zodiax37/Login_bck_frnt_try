import API from './axios';

// Obtener todas las categorías
export const obtenerCategorias = async () => {
    const res = await API.get('/categorias');
    return res.data;
};

// Obtener una categoría por ID
export const obtenerCategoria = async (id) => {
    const res = await API.get(`/categorias/${id}`);
    return res.data;
};

// Crear una nueva categoría
export const crearCategoria = async (data) => {
    const res = await API.post('/categorias', data);
    return res.data;
};

// Actualizar una categoría
export const actualizarCategoria = async (id, data) => {
    const res = await API.put(`/categorias/${id}`, data);
    return res.data;
};

// Eliminar (o desactivar) una categoría
export const eliminarCategoria = async (id) => {
    const res = await API.delete(`/categorias/${id}`);
    return res.data;
};
