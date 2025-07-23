
import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ message, onConfirm, onCancel, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Confirmación</h4>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onCancel} className="btn-secondary">Cancelar</button>
                    <button onClick={onConfirm} className="btn-danger">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;