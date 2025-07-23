// src/components/ProductContext.jsx
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
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorCategories, setErrorCategories] = useState(null);

    const transformProductPrice = (product) => {
        if (product && typeof product.price === 'string') {
            return { ...product, price: parseFloat(product.price) };
        }
        return product;
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null); // Limpiar errores anteriores
        try {
            const data = await api.fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
            // Manejar errores específicos, como el 429
            if (err.message.includes('429')) {
                setError('Demasiadas solicitudes. Por favor, espera unos momentos e inténtalo de nuevo.');
            } else {
                setError('Error al cargar productos. Inténtalo de nuevo más tarde.');
            }
            setProducts([]); // Asegurarse de que products esté vacío en caso de error
        } finally {
            setLoading(false); // Siempre desactiva loading al finalizar, sea éxito o error
        }
    }, []);

    const fetchAllCategories = useCallback(async () => {
        try {
            setLoadingCategories(true);
            setErrorCategories(null);
            const data = await api.fetchCategories();
            setCategories(data);
        } catch (err) {
            setErrorCategories(err.message);
        } finally {
            setLoadingCategories(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchAllCategories();
    }, [fetchProducts, fetchAllCategories]);

    const addProduct = async (productData) => {
        try {
            const productToSend = transformProductPrice(productData);
            const newProduct = await api.createProduct(productToSend);
            const transformedNewProduct = transformProductPrice(newProduct);
            setProducts(prev => [...prev, transformedNewProduct]);
            return { success: true, data: transformedNewProduct };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            const productToSend = transformProductPrice(productData);
            const updatedProduct = await api.updateProduct(productId, productToSend);
            const transformedUpdatedProduct = transformProductPrice(updatedProduct);
            setProducts(prev =>
                prev.map(p => (p.id === productId ? transformedUpdatedProduct : p))
            );
            return { success: true, data: transformedUpdatedProduct };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

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
        deleteProduct,
        categories,
        loadingCategories,
        errorCategories
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};