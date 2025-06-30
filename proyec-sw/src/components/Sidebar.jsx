import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const location = useLocation();

  const navItems = [
    { label: 'Inicio', path: '/', icon: 'bi-house-door-fill' },
    { label: 'Gestión de Productos', path: '/registrar-producto', icon: 'bi-box-seam' },
    { label: 'Ingreso de Existencias', path: '/ingresar-inventario', icon: 'bi-box-arrow-in-down' },
    { label: 'Ventas y Facturación', path: '/registrar-venta', icon: 'bi-receipt' },
    { label: 'Reportes', path: '/reportes', icon: 'bi-bar-chart-line-fill' },
    { label: 'Usuarios y Roles', path: '/usuarios', icon: 'bi-people-fill' },
    { label: 'Configuración', path: '/configuracion', icon: 'bi-gear-fill' },
  ];

  return (
    <div
      className="bg-light vh-100 border-end shadow-sm transition-all"
      style={{
        width: isCollapsed ? '60px' : '220px',
        position: 'fixed',
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
      }}
    >

      <ul className="nav flex-column p-3">
        {navItems.map((item, index) => (
          <li className="nav-item mb-2" key={index}>
            <Link
              to={item.path}
              className={`nav-link d-flex align-items-center ${
                location.pathname === item.path
                  ? 'active text-primary fw-bold'
                  : 'text-dark'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <i className={`bi ${item.icon} me-2 fs-5`}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

