import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../stilos/login.css';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const history = useHistory();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
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
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        </div>
        <div>
        <label htmlFor="password">Contraseña:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
        <button type="submit">Iniciar sesión</button>
    </form>
    </div>
);
};

export default Login;
