import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../stilos/transaccion.css';

function Transaccion() {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const fetchCarrito = async () => {
            try {
                // Obtener el ID de usuario del almacenamiento local
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('No se encontró el ID de usuario.');
                    return;
                }

                const response = await fetch(`http://localhost:3001/api/usuarios/${userId}/carrito`);

                if (response.ok) {
                    const data = await response.json();
                    setCarrito(data);

                    // Calcular el total del carrito
                    const totalAmount = data.reduce((acc, item) => acc + item.precio, 0);
                    setTotal(totalAmount);
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

    const handleRealizarTransaccion = async () => {
        try {
            // Obtener el ID de usuario del almacenamiento local
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No se encontró el ID de usuario.');
                return;
            }

            const response = await fetch(`http://localhost:3001/api/usuarios/${userId}/transaccion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carrito
                })
            });

            if (response.ok) {
                // Eliminar el carrito después de la transacción
                setCarrito([]);
                setTotal(0);
                alert('Transacción realizada con éxito');
            } else {
                console.error('Error realizando la transacción:', response.statusText);
            }
        } catch (error) {
            console.error('Error realizando la transacción:', error);
        }
    };

    return (
        <div className="transaccion-container">
            <div className="transaccion-header">
                <h2>Resumen de Transacción</h2>
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <ul className="carrito-list">
                {carrito.map(item => (
                    <li key={item.id_producto} className="product-item">
                        <h3>{item.nombre_producto}</h3>
                        <p>Precio: {item.precio}</p>
                    </li>
                ))}
            </ul>
            <div className="total-amount">Total: ${total.toFixed(2)}</div>
            <button className="transaccion-button" onClick={handleRealizarTransaccion}>Realizar Transacción</button>
        </div>
    );
}

export default Transaccion;
