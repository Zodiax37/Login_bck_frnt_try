// src/api/dashboard.js
import API from './axios';

export async function obtenerResumenDashboard() {
    const res = await API.get('/resumen-dash');
    return res.data;
}
