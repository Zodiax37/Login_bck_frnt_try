import API from './axios';

export const obtenerExistencias = async () => {
    const res = await API.get('/existencias');
    return res.data;
};

export const obtenerExistencia = async (id) => {
    const res = await API.get(`/existencias/${id}`);
    return res.data;
};

export async function RegistrarMovimiento(data) {
    const token = localStorage.getItem('token');
    const res = await API.post("/existencias/registrar-movimiento", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

