import React, { useState, useEffect } from 'react';
import "../stilos/categories.css";

function Categories({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categorias');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Error fetching categories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-container">
            <h2>Categorías</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id_categoria} onClick={() => onCategorySelect(category.id_categoria)}>
                        {category.nombre_categoria}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
