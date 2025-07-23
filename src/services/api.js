const API_BASE_URL = 'https://68803b4ff1dcae717b615b5e.mockapi.io/api/v1';

export const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('No se pudieron obtener los productos.');
    }
    return response.json();
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('No se pudo obtener el detalle del producto.');
    }
    return response.json();
};

export const createProduct = async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('No se pudo crear el producto.');
    }
    return response.json();
};

export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) {
        throw new Error('No se pudo actualizar el producto.');
    }
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('No se pudo eliminar el producto.');
    }

    return true;
};


export const fetchCategories = async () => {
    const products = await fetchProducts(); // Obtener productos primero
    const categories = [...new Set(products.map(p => p.category))];
    return ['all', ...categories];
};


export const fetchProductsByCategory = async (category) => {

    console.warn("fetchProductsByCategory puede no ser necesario si los productos se filtran localmente.");
    const allProducts = await fetchProducts();
    return allProducts.filter(p => p.category === category);
};