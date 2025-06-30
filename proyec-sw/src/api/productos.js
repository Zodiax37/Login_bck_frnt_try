
import API from './axios';

export const obtenerProductos = async () => {
    const res = await API.get(`/productos`);
    return res.data;
};
