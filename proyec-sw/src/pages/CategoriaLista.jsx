import { useEffect, useState } from 'react';
import { obtenerCategorias, eliminarCategoria } from '../api/categorias';
import { useNavigate } from 'react-router-dom';

export default function CategoriasLista() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const data = await obtenerCategorias();
                setCategorias(data);
            } catch (error) {
                alert('Error al cargar categorías');
                console.error(error);
            }
        };

        cargarCategorias();
    }, []);

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Deseas eliminar esta categoría?')) return;
        try {
            await eliminarCategoria(id);
            setCategorias(prev => prev.filter(cat => cat.Id !== id));
            alert('Categoría eliminada');
        } catch (err) {
            console.error(err);
            alert('Error al eliminar la categoría');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Categorías Registradas</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((cat) => (
                        <tr key={cat.Id}>
                            <td>{cat.Nombre}</td>
                            <td>{cat.Descripcion}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => navigate(`/categorias/editar/${cat.Id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(cat.Id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
