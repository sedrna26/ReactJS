// src/components/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../services/api'; // Asegúrate de que 'api' esté importado

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
    // NUEVO: Estado para las categorías
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true); // Opcional: estado de carga para categorías
    const [errorCategories, setErrorCategories] = useState(null); // Opcional: estado de error para categorías

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

    // NUEVO: Función para obtener todas las categorías
    const fetchAllCategories = useCallback(async () => {
        try {
            setLoadingCategories(true);
            setErrorCategories(null);
            const data = await api.fetchCategories(); // Asegúrate de que api.fetchCategories() exista
            setCategories(data); // `data` debería ser un array de categorías
        } catch (err) {
            setErrorCategories(err.message);
        } finally {
            setLoadingCategories(false);
        }
    }, []);


    // Cargar productos y categorías al iniciar el provider
    useEffect(() => {
        fetchProducts();
        fetchAllCategories(); // NUEVO: Cargar categorías cuando el proveedor se monta
    }, [fetchProducts, fetchAllCategories]); // Añade fetchAllCategories a las dependencias


    // ... (Mantén las funciones addProduct, updateProduct, deleteProduct sin cambios)
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
        // NUEVO: Expón las categorías y sus estados de carga/error
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