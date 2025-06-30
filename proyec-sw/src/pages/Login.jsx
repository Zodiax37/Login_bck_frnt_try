import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 

// Lista de usuarios simulados
const usuariosValidos = [
  { username: 'admin', password: '1234' },
  { username: 'juan', password: 'abcd' },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioValido = usuariosValidos.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioValido) {
      localStorage.setItem('logueado', 'true');
      onLogin(); // informa al App.js que se ha iniciado sesión
      navigate('/', { replace: true }); // redirige al Home
    } else {
      const nuevosIntentos = intentos + 1;
      setIntentos(nuevosIntentos);

      if (nuevosIntentos >= 3) {
        setError('Acceso bloqueado por exceso de intentos');
      } else {
        setError('Credenciales incorrectas');
      }
    }
  };

  return (
  <div className="login-container">
    <div className="login-box">
      
      {/* Panel izquierdo de bienvenida */}
      <div className="left-panel">
        <h2>MotoMan</h2>
        <p>Gestión moderna de inventario y ventas</p>
      </div>

      {/* Panel derecho con el formulario */}
      <div className="right-panel">
        <h4>Iniciar sesión</h4>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={intentos >= 3}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={intentos >= 3}
            required
          />
          {error && <small className="text-danger">{error}</small>}
          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={intentos >= 3}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  </div>
);

}
