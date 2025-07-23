
import React, { useState, useEffect } from 'react';
import './ProductForm.css';
const ProductForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: 'https://picsum.photos/640/480?random=1', 
        category: 'electronics'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0.';
        if (formData.description.length < 10) newErrors.description = 'La descripción debe tener al menos 10 caracteres.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Asegurarse de que price sea un número antes de enviarlo
            const dataToSend = {
                ...formData,
                price: parseFloat(formData.price),
            };
            onSubmit(dataToSend);
        }
    };

    return (
        <div className="product-form-overlay">
            <div className="product-form-card">
                <h3>{initialData ? 'Editar Producto' : 'Agregar Producto'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <small className="error-text">{errors.name}</small>}
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                        {errors.price && <small className="error-text">{errors.price}</small>}
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                        {errors.description && <small className="error-text">{errors.description}</small>}
                    </div>
                    {/* Campos de imagen y categoría pueden ser añadidos aquí si se desea */}
                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
                        <button type="submit" className="btn-submit">{initialData ? 'Actualizar' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;