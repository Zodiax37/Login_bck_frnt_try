import API from './axios';

export const obtenerExistencias = async () => {
    const res = await API.get('/existencias');
    return res.data;
};

export const obtenerExistencia = async (id) => {
    const res = await API.get(`/existencias/${id}`);
    return res.data;
};

export const RegistrarMovimiento = async (data) => {
    const res = await API.post('/existencias/registrar-movimiento', data);
    return res.data;
};