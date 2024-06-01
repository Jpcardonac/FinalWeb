import React, { useState, useEffect } from 'react';
import "../stilos/products.css"

function Products({ categoryId }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/productos?categoria=${categoryId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Error fetching products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div className="products-container">
            <h2>Productos</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id_producto}>
                        {product.nombre_producto}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
