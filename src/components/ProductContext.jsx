import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función auxiliar para transformar el precio a número
    const transformProductPrice = (product) => {
        if (product && typeof product.price === 'string') {
            return { ...product, price: parseFloat(product.price) };
        }
        return product;
    };


    // Función para obtener todos los productos
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.fetchProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar productos al iniciar el provider
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Función para agregar un producto
    const addProduct = async (productData) => {
        try {
            const newProduct = await api.createProduct(productData);
            setProducts(prev => [...prev, newProduct]);
            return { success: true, data: newProduct };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // Función para actualizar un producto
    const updateProduct = async (productId, productData) => {
        try {
            // Asegúrate de que el precio sea un número antes de enviar a la API
            const productToSend = transformProductPrice(productData);
            const updatedProduct = await api.updateProduct(productId, productToSend);
            // Asegúrate de que el precio sea un número al actualizar el estado local
            const transformedUpdatedProduct = transformProductPrice(updatedProduct);
            setProducts(prev =>
                prev.map(p => (p.id === productId ? transformedUpdatedProduct : p))
            );
            return { success: true, data: transformedUpdatedProduct };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };
    // Función para eliminar un producto
    const deleteProduct = async (productId) => {
        try {
            await api.deleteProduct(productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const value = {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};