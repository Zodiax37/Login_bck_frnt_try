// 📁 src/components/EmpleadoForm.jsx
import { useState, useEffect } from 'react';

export default function EmpleadoForm({ initialData = {}, onSubmit, loading }) {
        const [empleado, setEmpleado] = useState(() => ({ ...initialData }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpleado((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(empleado);
    };

    return (
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </form>
    );
}
