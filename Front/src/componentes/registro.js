import React, { useState } from 'react';
import '../stilos/registro.css';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, email, telefono, direccion, ciudad, estado, pais })
        });
        const data = await response.json();
        if (data.success) {
            alert('Usuario registrado exitosamente');
        } else {
            alert('Error al registrar usuario');
        }
    };

    return (
        <div className="registro-container">
            <div className="presentacion-mensaje">
                ¡Que gusto que llegaras hasta aquí! Estamos seguros de que te encantará la facilidad de navegación y la atención al cliente que ofrecemos. ¡Empieza hoy mismo y registrate para que disfrutes de una experiencia de compra como ninguna otra!
            </div>
            <form onSubmit={handleSubmit} className="registro-form">
                <div className="registro-row">
                    <label className="registro-label">Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Apellido:</label>
                    <input 
                        type="text" 
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Teléfono:</label>
                    <input 
                        type="tel" 
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Dirección:</label>
                    <input 
                        type="text" 
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Ciudad:</label>
                    <input 
                        type="text" 
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">Estado:</label>
                    <input 
                        type="text" 
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <div className="registro-row">
                    <label className="registro-label">País:</label>
                    <input 
                        type="text" 
                        value={pais}
                        onChange={(e) => setPais(e.target.value)} 
                        required 
                        className="registro-input"
                    />
                </div>
                <button type="submit" className="registro-button">Registrarse</button>
            </form>
        </div>
    );
}

export default Registro;
