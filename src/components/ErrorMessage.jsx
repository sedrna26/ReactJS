import React from 'react';
import {
    ErrorContainer,
    ErrorMessageText,
    RetryButton
} from './ErrorMessage.styles';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <ErrorContainer role="alert" aria-live="assertive"> {/* Atributos ARIA para accesibilidad */}
            <ErrorMessageText>
                {message || 'Ha ocurrido un error inesperado.'}
            </ErrorMessageText>
            {onRetry && (
                <RetryButton onClick={onRetry} aria-label="Reintentar operación">
                    Reintentar
                </RetryButton>
            )}
        </ErrorContainer>
    );
};

export default ErrorMessage;