

const API_BASE_URL = 'https://68803b4ff1dcae717b615b5e.mockapi.io/api/v1/';

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
    // No hay necesidad de devolver JSON en una eliminación exitosa
    return true;
};

// ==========================================================
// AÑADIR/VERIFICAR ESTAS FUNCIONES PARA LAS CATEGORÍAS
// ==========================================================

// Opción 1a: Si MockAPI tiene un endpoint específico para categorías (menos común)
export const fetchCategories = async () => {
    // Esto es un ejemplo. Dependerá de cómo MockAPI maneje las categorías.
    // A veces, las categorías se obtienen escaneando los productos existentes.
    // Podría ser algo como:
    // const response = await fetch(`${API_BASE_URL}/categories`);
    // if (!response.ok) {
    //     throw new Error('No se pudieron obtener las categorías.');
    // }
    // return response.json();

    // Si tu MockAPI no tiene un endpoint de categorías, puedes simularlas
    // o extraerlas de los productos si los productos ya están cargados en ProductContext.
    // Por ahora, asumiremos una lista fija o las extraeremos de los productos.
    console.warn("fetchCategories está usando datos simulados. Asegúrate de que tu API los proporcione.");
    const products = await fetchProducts(); // Obtener productos para extraer categorías
    const categories = [...new Set(products.map(p => p.category))];
    return ['all', ...categories]; // Añadir 'all' para la opción de todas las categorías
};

// Opción 1b: fetchProductsByCategory ya no es necesario en ProductList si los productos
// se filtran localmente, pero si quisieras una carga por categoría desde la API:
export const fetchProductsByCategory = async (category) => {
    // Si tu API permite filtrar por categoría
    // const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    // if (!response.ok) {
    //     throw new Error(`No se pudieron obtener productos para la categoría ${category}.`);
    // }
    // return response.json();

    // Como estamos obteniendo todos los productos del contexto en ProductList,
    // esta función ya no sería necesaria para ProductList.
    // Sin embargo, la mantenemos aquí por si otras partes de la app la usan.
    console.warn("fetchProductsByCategory puede no ser necesario si los productos se filtran localmente.");
    const allProducts = await fetchProducts();
    return allProducts.filter(p => p.category === category);
};