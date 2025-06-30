import { Link } from 'react-router-dom';
import InfoCard from '../components/InfoCard';

export default function Home() {
  return (
    <div className="container-fluid p-4">
      {/* Bienvenida */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h3 className="mb-0">Bienvenido, Juan Pérez</h3>
        <span className="text-muted fs-6">Panel de control - MotoMan</span>
      </div>

      {/* Métricas generales */}
      <section aria-label="Estadísticas del sistema">
        <div className="row g-3 mb-4">
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Productos en stock" value="182" icon="bi-box-seam" />
          </div>
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Productos bajo stock mínimo" value="5" icon="bi-exclamation-triangle" />
          </div>
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Ventas del día" value="C$ 12,800" icon="bi-cash-stack" />
          </div>
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Última venta registrada" value="3" icon="bi-clock-history" />
          </div>
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Total usuarios activos" value="3" icon="bi-people" />
          </div>
          <div className="col-md-4 col-lg-3">
            <InfoCard title="Alertas recientes" value="2" icon="bi-bell-fill" />
          </div>
        </div>
      </section>

      {/* Acciones rápidas */}
      <section aria-label="Acciones rápidas">
        <div className="d-flex flex-wrap gap-2">
          <Link to="/registrar-producto" className="btn btn-primary">
            <i className="bi bi-box-seam me-2"></i>Registrar producto
          </Link>
          <Link to="/registrar-venta" className="btn btn-success">
            <i className="bi bi-receipt me-2"></i>Registrar venta
          </Link>
          <Link to="/ingresar-inventario" className="btn btn-success">
            <i className="bi bi-box-arrow-in-down me-2"></i>Ingresar inventario
          </Link>
          <Link to="/reportes" className="btn btn-info">
            <i className="bi bi-bar-chart-line me-2"></i>Ver reportes
          </Link>
        </div>
      </section>
    </div>
  );
}
