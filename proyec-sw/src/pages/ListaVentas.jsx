import { useEffect, useState } from 'react';
import { obtenerVentas } from '../api/preventas';

export default function ListaVentas() {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('MetodoPago');

    const rol = localStorage.getItem('rol');
    const userId = parseInt(localStorage.getItem('userId'), 10);

    useEffect(() => {
        const cargarVentas = async () => {
            const data = await obtenerVentas(userId);
            setVentas(data);
            setVentasFiltradas(data); // Inicialmente sin filtros
        };
        cargarVentas();
    }, []);

    useEffect(() => {
        const resultado = ventas.filter(v => {
            const valor = filtro === 'Vendedor'
                ? v.Vendedor.toLowerCase()
                : filtro === 'MetodoPago'
                    ? v.MetodoPago.toLowerCase()
                    : '';

            const cumpleBusqueda = valor.includes(busqueda.toLowerCase());
            const fecha = new Date(v.FechaVenta);

            const cumpleDesde = fechaDesde
                ? fecha >= new Date(`${fechaDesde}T00:00:00`)
                : true;

            const cumpleHasta = fechaHasta
                ? fecha <= new Date(`${fechaHasta}T23:59:59`)
                : true;

            return cumpleBusqueda && cumpleDesde && cumpleHasta;
        });


        setVentasFiltradas(resultado);
        setPaginaActual(1);
    }, [busqueda, filtro, fechaDesde, fechaHasta, ventas]);

    // Calcular paginación
    const indexUltimo = paginaActual * elementosPorPagina;
    const indexPrimero = indexUltimo - elementosPorPagina;
    const ventasPaginadas = ventasFiltradas.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(ventasFiltradas.length / elementosPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3">{rol === 'admin' ? 'Todas las Ventas' : 'Mis Ventas'}</h2>

            {/* Búsqueda */}
            <div className="d-flex gap-2 mb-3">

                <input
                    type="date"
                    value={fechaDesde}
                    onChange={e => setFechaDesde(e.target.value)}
                    className="form-control me-2"
                    placeholder="Fecha desde"
                />
                <input
                    type="date"
                    value={fechaHasta}
                    onChange={e => setFechaHasta(e.target.value)}
                    className="form-control me-2"
                    placeholder="Fecha hasta"
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Buscar por MetodoPago`}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select className="form-select" value={filtro} onChange={(e) => setFiltro(e.target.value)}>

                    <option value="MetodoPago">Método de Pago</option>
                </select>
            </div>

            {/* Tabla */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha</th>
                        <th>Método de Pago</th>
                        <th>Total</th>
                        <th>Vendedor</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasPaginadas.map((venta) => (
                        <tr key={venta.VentaId}>
                            <td>{venta.VentaId}</td>
                            <td>{new Date(venta.FechaVenta).toLocaleString()}</td>
                            <td>{venta.MetodoPago}</td>
                            <td>${venta.Total.toFixed(2)}</td>
                            <td>{venta.Vendedor}</td>
                        </tr>
                    ))}
                    {ventasPaginadas.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No hay resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="d-flex justify-content-center align-items-center gap-2">
                <button
                    className="btn btn-outline-primary"
                    disabled={paginaActual === 1}
                    onClick={() => cambiarPagina(paginaActual - 1)}
                >
                    Anterior
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`btn ${paginaActual === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => cambiarPagina(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="btn btn-outline-primary"
                    disabled={paginaActual === totalPaginas}
                    onClick={() => cambiarPagina(paginaActual + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
