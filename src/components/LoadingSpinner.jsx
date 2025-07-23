import React from 'react';
import {
    LoadingContainer,
    SpinnerWrapper,
    Spinner,
    LoadingMessage
} from './LoadingSpinner.styles';

const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <LoadingContainer aria-live="polite" aria-busy="true"> {/* Atributos ARIA para accesibilidad */}
            <SpinnerWrapper>
                <Spinner />
                <LoadingMessage>{message}</LoadingMessage>
            </SpinnerWrapper>
        </LoadingContainer>
    );
};

export default LoadingSpinner;