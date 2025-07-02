import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerUsuario, actualizarUsuario } from '../api/usuarios';
import { obtenerEmpleados } from '../api/empleados';

export default function UsuariosEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const data = await obtenerUsuario(id);
                setUsuario(data);
            } catch (error) {
                console.error(error);
                alert('Error al cargar usuario');
            }
        };

        const cargarEmpleados = async () => {
            try {
                const data = await obtenerEmpleados();
                setEmpleados(data);
            } catch (error) {
                console.error(error);
                alert('Error al cargar empleados');
            }
        };

        cargarUsuario();
        cargarEmpleados();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarUsuario(id, usuario);
            alert('Usuario actualizado correctamente');
            navigate('/usuarios');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar usuario');
        }
    };

    if (!usuario) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" name="Username" value={usuario.Username} onChange={handleChange} className="form-control" required />
                </div>

               

                <div className="mb-3">
                    <label>Rol</label>
                    <select name="Rol" value={usuario.Rol} onChange={handleChange} className="form-control">
                        <option value="admin">Administrador</option>
                        <option value="ventas">Ventas</option>
                        <option value="inventario">Inventario</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Estado</label>
                    <select
                        name="Estado"
                        value={usuario.Estado ? "1" : "0"}
                        onChange={(e) => setUsuario((prev) => ({ ...prev, Estado: e.target.value === "1" }))}
                        className="form-control"
                    >
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Empleado</label>
                    <select
                        name="EmpleadoId"
                        value={usuario.EmpleadoId || ''}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Seleccione un empleado</option>
                        {empleados.map((emp) => (
                            <option key={emp.Id} value={emp.Id}>
                                {emp.Nombre} {emp.Apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Nueva Contraseña (opcional)</label>
                    <input
                        type="password"
                        name="Password"
                        className="form-control"
                        onChange={(e) => setUsuario((prev) => ({ ...prev, Password: e.target.value }))}
                        placeholder="Dejar en blanco para no cambiar"
                    />
                </div>

                <button className="btn btn-primary" type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
}
