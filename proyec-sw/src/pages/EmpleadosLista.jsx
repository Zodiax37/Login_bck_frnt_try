import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerEmpleados, eliminarEmpleado } from '../api/empleados';

export default function EmpleadosLista() {
    const navigate = useNavigate();
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarEmpleados = async () => {
        try {
            const data = await obtenerEmpleados();
            console.log("Datos empleados recibidos:", data); // 
            setEmpleados(data);
            
        } catch (error) {
            console.error('Error al cargar empleados:', error);
            alert('No se pudieron cargar los empleados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEmpleados();
        
    }, []);

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Deseas eliminar este empleado?')) return;
        try {
            await eliminarEmpleado(id);
            alert('Empleado eliminado correctamente');
            await cargarEmpleados();
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            alert('Error al eliminar empleado');
        }
    };

    return (
        <div className="container p-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-success" onClick={() => navigate('/empleados/crear')}>
                    Añadir Empleado
                </button>
            </div>

            <h2>Gestión de Empleados</h2>

            {loading ? (
                <p>Cargando empleados...</p>
            ) : (
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Área</th>
                            <th>Cargo</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((e) => (
                            <tr key={e.Id}>
                                <td>{e.Nombre}</td>
                                <td>{e.AreaDeTrabajo}</td>
                                <td>{e.Cargo}</td>
                                <td>{e.Telefono}</td>
                                <td>{e.Correo}</td>
                                <td>{e.Estado[0] ===true ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => navigate(`/empleados/editar/${e.Id}`)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleEliminar(e.Id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
