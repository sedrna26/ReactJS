import React from 'react';
import {
    ModalOverlay,
    ModalContent,
    ModalMessage,
    ModalButtons,
    ConfirmButton,
    CancelButton
} from './ConfirmationModal.styles';

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent role="dialog" aria-modal="true" aria-labelledby="modal-message">
                <ModalMessage id="modal-message">{message}</ModalMessage>
                <ModalButtons>
                    <ConfirmButton onClick={onConfirm} aria-label="Confirmar acción">
                        Confirmar
                    </ConfirmButton>
                    <CancelButton onClick={onCancel} aria-label="Cancelar acción">
                        Cancelar
                    </CancelButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ConfirmationModal;