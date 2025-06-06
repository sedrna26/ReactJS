import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;