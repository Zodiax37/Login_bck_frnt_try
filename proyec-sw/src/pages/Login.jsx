// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; // 👈 importar tu instancia de Axios
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post('/login', {
        userName: username,
        pass: password
      });

      const { token } = res.data;
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT

      localStorage.setItem('token', token);
      localStorage.setItem('logueado', 'true');
      localStorage.setItem('rol', payload.rol); // ejemplo: 'admin', 'Ventas', etc.
      localStorage.setItem('username', payload.username);
      localStorage.setItem('userId', payload.id);

      onLogin(); // actualiza el estado del App
      navigate('/', { replace: true });

    } catch (err) {
      const nuevosIntentos = intentos + 1;
      setIntentos(nuevosIntentos);

      if (err.response?.status === 403) {
        setError("Usuario bloqueado temporalmente");
      } else if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrecta");
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="left-panel">
          <h2>MotoMan</h2>
          <p>Gestión moderna de inventario y ventas</p>
        </div>

        <div className="right-panel">
          <div className='d-flex justify-content-center mb-2'>
            <h4 className='h2'>Iniciar sesión</h4>
          </div>
          <form className="gap-3" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              className="form-control border border-dark mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={intentos >= 3}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className='form-control border border-dark mb-3'
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
