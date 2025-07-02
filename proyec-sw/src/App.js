// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from './utils/auth';

import Home from './pages/Home';
import RegistroProducto from './pages/RegistroProducto';
import EditarProductoPage from './pages/EditarProductoPage';
import IngresoInventario from './pages/IngresoInventario';
import RegistrarVenta from './pages/RegistrarVenta';
import GenerarReporte from './pages/GenerarReporte';
import Usuarios from './pages/Usuarios';
import Configuracion from './pages/Configuracion';
import Login from './pages/Login';
import CrearUserForm from './pages/CrearUserForm';
import CatalogoProductos from './pages/CatalogoProducto';
import PreventaPage from './pages/PreventaPage';
import PreventasPendientes from "./pages/PreventasPendientes"
import ListaMovimientosInventario from './pages/Movimientos/ListaMovimientosInventario';
import RegistrarMovimientoPage from './pages/Movimientos/RegistrarMovimiento';
import RegistrarCategoriaPage from './pages/RegistrarCategoriaPage';
import RegistrarProveedorPage from './pages/RegistrarProveedorPage';
import UsuariosEditar from './pages/UsuariosEditar';
import CategoriasLista from './pages/CategoriaLista';
import ListaVentas from './pages/ListaVentas';
import EmpleadoEditarPage from './pages/EmpleadoEditarPage';

import EmpleadosLista from './pages/EmpleadosLista';
import EmpleadoCrearPage from './pages/EmpleadoCrearpage';
import ProveedorEditarPage from './pages/ProveedorEditarPage';

import ProveedorListaPage from './pages/ProveedorListapage';


import CategoriaEditarPage from './pages/CategoriaEditarPage';




function App() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('logueado');
    setLogueado(session === 'true');

    const sidebarState = localStorage.getItem('sidebarMotoMan');
    if (sidebarState !== null) {
      setSidebarAbierto(sidebarState === 'true');
    }


    const config = JSON.parse(localStorage.getItem('configMotoMan'));
    if (config?.tema === 'oscuro') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

  }, []);




  const toggleSidebar = () => {
    const nuevoEstado = !sidebarAbierto;
    setSidebarAbierto(nuevoEstado);
    localStorage.setItem('sidebarMotoMan', nuevoEstado);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('sidebarMotoMan')

    localStorage.removeItem('username')

    localStorage.removeItem('userId')

    localStorage.removeItem('preventaId')
    setLogueado(false);
  };

  return (
    <Router>
      {logueado ? (
        <div className="d-flex">
          <Sidebar rol={localStorage.getItem('rol')} isCollapsed={!sidebarAbierto} toggleSidebar={toggleSidebar} />
          <div
            className="flex-grow-1"
            style={{
              marginLeft: sidebarAbierto ? '220px' : '60px',
              transition: 'margin-left 0.3s',
            }}
          >
            {/* Navbar superior */}
            <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={toggleSidebar}
                  title={sidebarAbierto ? 'Ocultar menú' : 'Mostrar menú'}
                >
                  <i className="bi bi-list fs-5"></i>
                </button>
                <h4 className="mb-0">MotoMan</h4>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>

            {/* RUTAS del contenido privado */}
            <div className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="productos/registrar-producto" element={<RegistroProducto />} />
                <Route path="/productos/editar-producto/:id" element={<EditarProductoPage />} />
                <Route path="/ingresar-inventario" element={<IngresoInventario />} />
                <Route path="/registrar-venta" element={<RegistrarVenta />} />
                <Route path="/reportes" element={<GenerarReporte />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="crear-usuario" element={<CrearUserForm />} />
                <Route path="usuarios/editar/:id" element={<UsuariosEditar />} />

                <Route path="/configuracion" element={<Configuracion />} />
                <Route path='/productos/catalogo' element={<CatalogoProductos />} />
                {/* <Route path="/preventa" element={<RegistrarProductoPage />} /> */}
                <Route path="/seleccionar-preventa" element={<PreventasPendientes />} />
                <Route path="/movimientos" element={<ListaMovimientosInventario />} />
                <Route path="/registrar-movimiento" element={<RegistrarMovimientoPage />} />
                <Route path="/ventas/listado" element={<ListaVentas />} />
                <Route path="/preventa" element={<PreventaPage />} />

                <Route path="/categorias/lista" element={<CategoriasLista />} />

                <Route path="/categorias/editar/:id" element={<CategoriaEditarPage />} />

                <Route path="/categorias/registrar" element={<RegistrarCategoriaPage />} />

                <Route path="/proveedores/registrar" element={<RegistrarProveedorPage />} />
                <Route path="/proveedores/lista" element={<ProveedorListaPage />} />
                <Route path="/proveedores/editar/:id" element={<ProveedorEditarPage />} />

                <Route path="/empleados/Lista" element={<EmpleadosLista />} />
                <Route path="/empleados/crear" element={<EmpleadoCrearPage />} />
                <Route path="/empleados/editar/:id" element={<EmpleadoEditarPage />} />



                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setLogueado(true)} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
