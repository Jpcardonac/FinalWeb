import React, { useState } from 'react';
import '../stilos/recovery.css';

function RecuperarContrasena() {
    const [id_usuario, setIdUsuario] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/recuperar-contrasena', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario, email })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Nueva contraseña enviada a tu correo electrónico');
            } else {
                alert('Error al recuperar la contraseña: ' + data.message);
            }
        } catch (error) {
            console.error('Error al recuperar la contraseña:', error);
            alert('Ocurrió un error al recuperar la contraseña');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID de Usuario:</label>
                <input 
                    type="text" 
                    value={id_usuario}
                    onChange={(e) => setIdUsuario(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Recuperar Contraseña</button>
        </form>
    );
}

export default RecuperarContrasena;
