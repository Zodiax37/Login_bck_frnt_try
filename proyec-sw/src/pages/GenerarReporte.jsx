import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function GenerarReporte() {
  const [tipo, setTipo] = useState('Ventas');
  const [mostrar, setMostrar] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleGenerar = (e) => {
    e.preventDefault();
    setMostrar(true);
  };

  // Datos simulados
  const ventasPorDia = [1200, 1800, 1400, 1600, 2000, 2400, 3000];
  const productosPopulares = [
    { nombre: 'Aceite 2T', ventas: 50 },
    { nombre: 'Cámara GoPro', ventas: 30 },
    { nombre: 'Casco LS2', ventas: 20 },
  ];
  const stockBajo = [
    { nombre: 'Candado antirrobo', cantidad: 2 },
    { nombre: 'Filtro de aire', cantidad: 3 },
    { nombre: 'Guantes', cantidad: 1 },
  ];

  const datosVentas = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas por día (C$)',
        data: ventasPorDia,
        backgroundColor: '#0d6efd',
      },
    ],
  };

  const datosProductos = {
    labels: productosPopulares.map(p => p.nombre),
    datasets: [
      {
        label: 'Cantidad vendida',
        data: productosPopulares.map(p => p.ventas),
        backgroundColor: ['#ffc107', '#198754', '#dc3545'],
      },
    ],
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4">Generar Reporte</h2>

      <form className="row g-3 shadow bg-light p-4 rounded" onSubmit={handleGenerar}>
        <div className="col-md-6">
          <label className="form-label">Fecha inicio</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha fin</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Tipo de reporte</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option>Ventas</option>
            <option>Productos más vendidos</option>
            <option>Inventario bajo</option>
          </select>
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-info">Generar</button>
        </div>
      </form>

      {/* Mostrar resultados */}
      {mostrar && (
        <div className="mt-5">
          <h5 className="mb-3">Reporte: {tipo}</h5>

          {tipo === 'Ventas' && (
            <Bar data={datosVentas} />
          )}

          {tipo === 'Productos más vendidos' && (
            <Pie data={datosProductos} />
          )}

          {tipo === 'Inventario bajo' && (
            <ul className="list-group">
              {stockBajo.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  <span>{item.nombre}</span>
                  <span className="badge bg-danger">{item.cantidad} unidades</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
