import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearEmpleado } from '../api/empleados';
import EmpleadoForm from '../components/EmpleadoForm';

export default function EmpleadoCrearPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCrear = async (empleado) => {
        setLoading(true);
        try {
            await crearEmpleado(empleado);
            alert('Empleado creado correctamente');
            navigate('/empleados');
        } catch (error) {
            console.error('Error al crear empleado:', error);
            alert('Error al crear empleado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Empleado</h2>
            <EmpleadoForm onSubmit={handleCrear} loading={loading} />
        </div>
    );
}
