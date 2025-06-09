import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h3 className="error-title">¡Oops! Algo salió mal</h3>
                <p className="error-message">{message}</p>
                {onRetry && (
                    <button className="retry-button" onClick={onRetry}>
                        Intentar de nuevo
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;