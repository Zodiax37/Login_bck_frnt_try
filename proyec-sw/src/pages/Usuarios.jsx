import { useNavigate } from 'react-router-dom';


export default function Usuarios() {
const navigate = useNavigate();

  const usuarios = [
    { id: 1, nombre: 'Juan Pérez', rol: 'Administrador', estado: 'Activo' },
    { id: 2, nombre: 'María López', rol: 'Vendedor', estado: 'Inactivo' }
  ]; // Luego esto vendrá de base de datos

  return (
    <div className="container p-4">
      <div className="d-flex align-items-end flex-column bd-highlight mb-3">
        <button className="btn btn-success" type="button" onClick={() => navigate('/crear-usuario')}>Añadir Usuario</button>
      </div>
      <h2>Gestión de Usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.rol}</td>
              <td>{u.estado}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Editar</button>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
