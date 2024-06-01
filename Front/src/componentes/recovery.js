import React, { useState } from 'react';
import '../stilos/recovery.css';

function Recovery() {
    const [option, setOption] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const handleOptionChange = (event) => {
        setOption(event.target.value);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes implementar la lógica para enviar la contraseña por correo electrónico o SMS
        // Dependiendo de la opción seleccionada y el valor del input
        if (option === 'email') {
            // Lógica para enviar la contraseña por correo electrónico
            setMessage('Contraseña enviada por correo electrónico');
        } else if (option === 'phone') {
            // Lógica para enviar la contraseña por SMS
            setMessage('Contraseña enviada por SMS');
        }
    };

    return (
        <div className="recovery-container">
            <h2>Recupera tu contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="option-radio">
                    <input 
                        type="radio" 
                        id="email" 
                        name="option" 
                        value="email" 
                        checked={option === 'email'} 
                        onChange={handleOptionChange} 
                    />
                    <label htmlFor="email">Correo</label>
                    <input 
                        type="radio" 
                        id="phone" 
                        name="option" 
                        value="phone" 
                        checked={option === 'phone'} 
                        onChange={handleOptionChange} 
                    />
                    <label htmlFor="phone">Teléfono</label>
                </div>
                {option && (
                    <div className="input-field">
                        <label>{option === 'email' ? 'Correo electrónico:' : 'Teléfono:'}</label>
                        <input 
                            type={option === 'email' ? 'email' : 'tel'} 
                            value={inputValue} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                )}
                <button type="submit">Solicitar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Recovery;
