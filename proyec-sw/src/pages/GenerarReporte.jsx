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
import {
  getVentasPorFecha,
  getProductosMasVendidos,
  getStockBajo
} from '../api/reportes';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function GenerarReporte() {
  const [tipo, setTipo] = useState('Ventas');
  const [mostrar, setMostrar] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dataGrafico, setDataGrafico] = useState(null);
  const [error, setError] = useState('');

  const handleGenerar = async (e) => {
    e.preventDefault();
    setMostrar(false);
    setError('');
    setDataGrafico(null);

    try {
      if (tipo === 'Ventas') {
        const datos = await getVentasPorFecha(fechaInicio, fechaFin);
        const fechas = datos.map(d => new Date(d.Fecha).toLocaleDateString());
        const montos = datos.map(d => d.TotalFinalVentas);

        setDataGrafico({
          type: 'bar',
          data: {
            labels: fechas,
            datasets: [{
              label: 'Total vendido (C$)',
              data: montos,
              backgroundColor: '#0d6efd'
            }]
          }
        });

      } else if (tipo === 'Productos más vendidos') {
        const datos = await getProductosMasVendidos(fechaInicio, fechaFin);
        const nombres = datos.map(p => p.Producto);
        const cantidades = datos.map(p => p.CantidadVendida);

        setDataGrafico({
          type: 'pie',
          data: {
            labels: nombres,
            datasets: [{
              label: 'Cantidad vendida',
              data: cantidades,
              backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1']
            }]
          }
        });

      } else if (tipo === 'Inventario bajo') {
        const datos = await getStockBajo();
        // Asumimos que devuelve ProductosBajoMinimo
        const total = datos.ProductosBajoMinimo;
        setDataGrafico({
          type: 'info',
          data: total
        });
      }

      setMostrar(true);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos del reporte.');
    }
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
            required={tipo !== 'Inventario bajo'}
            disabled={tipo === 'Inventario bajo'}
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

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      {mostrar && dataGrafico && (
        <div className="mt-5">
          <h5 className="mb-3">Reporte: {tipo}</h5>

          {dataGrafico.type === 'bar' && <Bar data={dataGrafico.data} />}
          {dataGrafico.type === 'pie' && <Pie data={dataGrafico.data} />}
          {dataGrafico.type === 'info' && (
            <div className="alert alert-warning">
              Productos con inventario bajo mínimo: <strong>{dataGrafico.data}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
