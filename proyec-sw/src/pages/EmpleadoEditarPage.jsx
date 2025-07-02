import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerEmpleado, actualizarEmpleado } from '../api/empleados';

export default function EmpleadoEditarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState(null);
    const [personaId, setPersonaId] = useState(null);
    const [loading, setLoading] = useState(true);

    const cargarEmpleado = async () => {
        try {
            const data = await obtenerEmpleado(id);
            setEmpleado(data);
            setPersonaId(data.PersonaId); // Guardamos el PersonaId para usarlo en la actualización
        } catch (error) {
            console.error('Error al obtener empleado:', error);
            alert('No se pudo cargar el empleado');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEmpleado();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpleado((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarEmpleado(id, {
                ...empleado,
                PersonaId: personaId
            });
            alert('Empleado actualizado correctamente');
            navigate('/empleados/Lista');
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar empleado');
        }
    };

    if (loading) return <p>Cargando empleado...</p>;
    if (!empleado) return <p>Empleado no encontrado</p>;

    return (
        <div className="container mt-4">
            <h2>Editar Empleado</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Cédula</label>
                    <input type="text" className="form-control" name="Cedula" value={empleado.Cedula || ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="Correo" value={empleado.Correo || ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="Direccion" value={empleado.Direccion || ''} onChange={handleChange} />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Edad</label>
                    <input type="number" className="form-control" name="Edad" value={empleado.Edad || ''} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className="form-control" name="FechaNac" value={empleado.FechaNac?.substring(0, 10) || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Primer Nombre</label>
                    <input type="text" className="form-control" name="PrimerNombre" value={empleado.PrimerNombre || ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Segundo Nombre</label>
                    <input type="text" className="form-control" name="SegundoNombre" value={empleado.SegundoNombre || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Primer Apellido</label>
                    <input type="text" className="form-control" name="PrimerApellido" value={empleado.PrimerApellido || ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Segundo Apellido</label>
                    <input type="text" className="form-control" name="SegundoApellido" value={empleado.SegundoApellido || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="Telefono" value={empleado.Telefono || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Área de Trabajo</label>
                    <input type="text" className="form-control" name="AreaDeTrabajo" value={empleado.AreaDeTrabajo || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Cargo</label>
                    <input type="text" className="form-control" name="Cargo" value={empleado.Cargo || ''} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Fecha de Ingreso</label>
                    <input type="date" className="form-control" name="FechaIngreso" value={empleado.FechaIngreso?.substring(0, 10) || ''} onChange={handleChange} />
                </div>
                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/empleados/Lista')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
