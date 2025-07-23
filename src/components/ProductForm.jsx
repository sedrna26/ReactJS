import React, { useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import { toast } from 'react-toastify';
import {
    ModalOverlay,
    ProductFormContainer,
    CloseButton,
    FormTitle,
    FormGroup,
    FormActions,
    SaveButton,
    CancelButton,
    ErrorMessage
} from './ProductForm.styles';

const ProductForm = ({ onSubmit, initialData = null, onCancel }) => {
    const { categories } = useProducts();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price || '',
                description: initialData.description || '',
                category: initialData.category || '',
                image: initialData.image || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'El nombre es requerido.';
        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) errors.price = 'El precio debe ser un número positivo.';
        if (!formData.description.trim()) errors.description = 'La descripción es requerida.';
        if (!formData.category.trim()) errors.category = 'La categoría es requerida.';
        if (!formData.image.trim()) errors.image = 'La URL de la imagen es requerida.';
        else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(formData.image)) errors.image = 'URL de imagen inválida.';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        } else {
            toast.error('Por favor, corrige los errores del formulario.');
        }
    };

    return (
        <ModalOverlay>
            <ProductFormContainer role="dialog" aria-modal="true" aria-labelledby="form-title">
                <CloseButton onClick={onCancel} aria-label="Cerrar formulario">
                    &times;
                </CloseButton>
                <FormTitle id="form-title">
                    {initialData ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </FormTitle>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            aria-required="true" // Indica que el campo es requerido
                        />
                        {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="price">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            placeholder="Ej: 19.99"
                            aria-required="true"
                        />
                        {formErrors.price && <ErrorMessage>{formErrors.price}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Descripción detallada del producto"
                            aria-required="true"
                        ></textarea>
                        {formErrors.description && <ErrorMessage>{formErrors.description}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="category">Categoría:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            aria-required="true"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                        {formErrors.category && <ErrorMessage>{formErrors.category}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="image">URL de Imagen:</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            aria-required="true"
                        />
                        {formErrors.image && <ErrorMessage>{formErrors.image}</ErrorMessage>}
                    </FormGroup>

                    <FormActions>
                        <CancelButton type="button" onClick={onCancel} aria-label="Cancelar">
                            Cancelar
                        </CancelButton>
                        <SaveButton type="submit" aria-label={initialData ? "Guardar cambios" : "Añadir producto"}>
                            {initialData ? 'Guardar Cambios' : 'Añadir Producto'}
                        </SaveButton>
                    </FormActions>
                </form>
            </ProductFormContainer>
        </ModalOverlay>
    );
};

export default ProductForm;