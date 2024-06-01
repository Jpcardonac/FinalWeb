import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../stilos/carrito.css';

function Carrito() {
    const [carrito, setCarrito] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchCarrito = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('No se encontró el ID de usuario.');
                    return;
                }

                const response = await fetch(`http://localhost:3001/api/usuarios/${userId}/carrito`);

                if (response.ok) {
                    const data = await response.json();
                    setCarrito(data);
                } else {
                    console.error('Error fetching carrito:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching carrito:', error);
            }
        };

        fetchCarrito();
    }, []);

    const handleLogout = () => {
        history.push('/login');
    };

    return (
        <div className="carrito-container">
            <div className="carrito-header">
                <div className="header-buttons">
                    <Link to="/transaccion">
                        <button className="transaccion-button">Realizar Transacción</button>
                    </Link>
                    <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
                <h2>Carrito</h2>
            </div>
            <ul className="carrito-list">
                {carrito.map(item => (
                    <li key={item.id_producto} className="product-item">
                        <h3>{item.nombre_producto}</h3>
                        <p>Precio: {item.precio}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Carrito;
