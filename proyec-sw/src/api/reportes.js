// src/api/dashboard.js
import API from './axios';

export async function obtenerResumenDashboard() {
    const res = await API.get('/resumen-dash');
    return res.data;
}

    

// Requiere token (middleware `auth`)
export const getVentasPorFecha = async (fechaInicio, fechaFin) => {
    const res = await API.get('/reportes/ventas-por-fecha', {
        params: { fechaInicio, fechaFin }
    });
    return res.data;
};

export const getProductosMasVendidos = async (fechaInicio, fechaFin) => {
    const res = await API.get('/reportes/mas-vendidos', {
        params: { fechaInicio, fechaFin }
    });
    return res.data;
};

export const getStockBajo = async () => {
    // Puedes usar el resumen dashboard si ya da productos bajo mínimo
    const res = await API.get('/reportes/resumen-dash');
    return res.data;
};
