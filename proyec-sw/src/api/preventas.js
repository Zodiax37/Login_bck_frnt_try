// src/api/preventas.js
import API from './axios';

// Crear una nueva preventa
export const crearPreventa = async (usuarioId) => {
    const res = await API.post('/preventas', { UsuarioId: usuarioId });
    return res.data;
};

// Agregar un producto a la preventa
export const agregarProductoPreventa = async ({ preventaId, productoId, cantidad }) => {
    const res = await API.post('/preventas/agregar', {
        preventaId: preventaId,
        productoId: productoId,
        cantidad: cantidad,
    });
    return res.data;
};

// Quitar un producto de la preventa
export const quitarProductoPreventa = async ({ preventaId, productoId }) => {
    const res = await API.post('/preventas/quitar', {
        preventaId: preventaId,
        productoId: productoId,
    });
    return res.data;
};

// Obtener los productos de una preventa
export const obtenerProductosDePreventa = async (preventaId) => {
    const res = await API.get(`/preventas/${preventaId}`);
    return res.data;
};

// Confirmar una preventa y generar la venta
export const confirmarVenta = async (data) => {
    const res = await API.post('/preventas/confirmar', data);
    return res.data;
};
