import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../stilos/login.css';

const Login = () => {
    const [id_usuario, setIdUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_usuario, contrasena }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                history.push('/categorias');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id_usuario">ID de Usuario:</label>
                    <input
                        type="text"
                        id="id_usuario"
                        value={id_usuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <div className="login-options">
                <a href="/registro" className="register-link">¿No tienes cuenta? Regístrate aquí</a>
                <span style={{ marginLeft: '30px' }}></span>
                <a href="/olvido-contraseña" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    );
};

export default Login;
