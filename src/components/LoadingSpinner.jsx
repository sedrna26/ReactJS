import React from 'react';
import {
    LoadingContainer,
    SpinnerWrapper,
    Spinner,
    LoadingMessage
} from './LoadingSpinner.styles';

const LoadingSpinner = ({ message = "Cargando..." }) => {
    return (
        <LoadingContainer aria-live="polite" aria-busy="true">
            <SpinnerWrapper>
                <Spinner />
                <LoadingMessage>{message}</LoadingMessage>
            </SpinnerWrapper>
        </LoadingContainer>
    );
};

export default LoadingSpinner;