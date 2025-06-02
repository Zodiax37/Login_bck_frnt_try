import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
    const [userName, setUserName] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, pass })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setDisabled(true);
                navigate('/inicio')
            } else {
                setMessage(data.error);

                // Si está bloqueado, también desactivamos inputs
                if (data.error.includes('bloqueado')) {
                    setDisabled(true);
                }
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setMessage('Error de conexión');
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Iniciar sesión</h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input className="form-control" type="text" placeholder="Usuario"
                        value={userName} onChange={(e) => setUserName(e.target.value)} disabled={disabled}/>
                    </div>

                    <div className="mb-3">
                        <input className="form-control" type="password" placeholder="Contraseña"
                            value={pass} onChange={(e) => setPass(e.target.value)} disabled={disabled} />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit" disabled={disabled}>
                            Entrar
                        </button>
                    </div>
                </form>

                    <div className="alert alert-info mt-3" role="alert">
                        {message}
                    </div>
                
            </div>
        </div>
    );
}



export default LoginForm;