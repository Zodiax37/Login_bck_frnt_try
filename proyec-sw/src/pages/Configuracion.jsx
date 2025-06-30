import { useState } from 'react';

export default function Configuracion() {
  const [config, setConfig] = useState({
    nombreEmpresa: 'MotoMan',
    umbralStock: 5,
    alertasEmail: true,
    tema: 'claro',
    idioma: 'es',
    mostrarEstadisticas: true,
    diaCorte: 'Lunes'
  });

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({ ...config, [name]: type === 'checkbox' ? checked : value });
  };

  const guardar = () => {
    alert('Configuración actualizada');
    console.log(config);
    // Futuro: axios.post('/api/configuracion', config);
  };

  return (
    <div className="container p-4">
      <h2>Configuración del Sistema</h2>
      <form className="row g-3 bg-light p-4 rounded shadow-sm">
        <div className="col-md-6">
          <label>Nombre de la empresa</label>
          <input className="form-control" name="nombreEmpresa" value={config.nombreEmpresa} onChange={manejarCambio} />
        </div>

        <div className="col-md-3">
          <label>Umbral mínimo de stock</label>
          <input type="number" className="form-control" name="umbralStock" value={config.umbralStock} onChange={manejarCambio} />
        </div>

        <div className="col-md-3">
          <label>Día de corte de reportes</label>
          <select className="form-select" name="diaCorte" value={config.diaCorte} onChange={manejarCambio}>
            <option>Lunes</option>
            <option>Miércoles</option>
            <option>Viernes</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Tema visual</label>
          <select className="form-select" name="tema" value={config.tema} onChange={manejarCambio}>
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
          </select>
        </div>

        <div className="col-md-6">
          <label>Idioma</label>
          <select className="form-select" name="idioma" value={config.idioma} onChange={manejarCambio}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="alertasEmail" checked={config.alertasEmail} onChange={manejarCambio} />
            <label className="form-check-label">Habilitar alertas por correo</label>
          </div>

          <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" name="mostrarEstadisticas" checked={config.mostrarEstadisticas} onChange={manejarCambio} />
            <label className="form-check-label">Mostrar gráficas en dashboard</label>
          </div>
        </div>

        <div className="col-12 text-end">
          <button type="button" className="btn btn-primary" onClick={guardar}>Guardar cambios</button>
        </div>
      </form>
    </div>
  );
}
