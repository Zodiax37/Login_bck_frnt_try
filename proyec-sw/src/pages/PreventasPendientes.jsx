import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPreventasPendientes } from '../api/preventas';

export default function SeleccionarPreventaPage() {
    const [preventas, setPreventas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPreventas = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const data = await obtenerPreventasPendientes(userId);
                setPreventas(data);
            } catch (err) {
                alert('Error al obtener preventas pendientes');
                console.error(err);
            }
        };
        fetchPreventas();
    }, []);

    const seleccionarPreventa = (id) => {
        localStorage.setItem('preventaId', id);
        navigate('/preventa'); // Redirigir a PreventaPage
    };

    return (
        <div className="container mt-4">
            <h2>Seleccionar Preventa Pendiente</h2>
            {preventas.length === 0 ? (
                <p>No hay preventas pendientes.</p>
            ) : (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha de creación</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preventas.map(p => (
                            <tr key={p.Id}>
                                <td>{p.Id}</td>
                                <td>{p.Fecha
                                    ? new Date(p.Fecha.replace(' ', 'T')).toLocaleString()
                                    : 'Sin fecha'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => seleccionarPreventa(p.Id)}
                                    >
                                        Continuar
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
