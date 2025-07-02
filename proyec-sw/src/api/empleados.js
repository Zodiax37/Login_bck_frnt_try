import API from './axios';

export const obtenerEmpleados = async () => {
  const res = await API.get('/empleados');
  return res.data;
};

export const obtenerEmpleado = async (id) => {
    const res = await API.get(`/empleados/${id}`);
    return res.data;
};

// Crear un nuevo usuario
export const crearEmpleado = async (data) => {
    const res = await API.post('/empleados', data);
    return res.data;
};



export const actualizarEmpleado = async (id, data) => {
    const res = await API.put(`/empleados/${id}`, data);
    return res.data;
};



export const eliminarEmpleado = async (id) => {
    const res = await API.delete(`/empleados/${id}`);
    return res.data;
};

//--------------------------------
// src/api/usuarios.js

