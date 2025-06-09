// Configuración de la API
const API_BASE_URL = 'https://fakestoreapi.com';

// Función para manejar errores de red
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

// Función para obtener todos los productos
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await handleResponse(response);

        // Transformar los datos de la API para que coincidan con nuestro formato
        return products.map(product => ({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price),
            image: product.image,
            description: product.description,
            category: product.category,
            rating: product.rating
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('No se pudieron cargar los productos');
    }
};

// Función para obtener un producto por ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('No se pudo cargar el producto');
    }
};

// Función para obtener categorías
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('No se pudieron cargar las categorías');
    }
};

// Función para obtener productos por categoría
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        const products = await handleResponse(response);

        return products.map(product => ({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price),
            image: product.image,
            description: product.description,
            category: product.category,
            rating: product.rating
        }));
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('No se pudieron cargar los productos de la categoría');
    }
};

// Simulación de API para enviar pedido (mock)
export const submitOrder = async (orderData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                orderId: Math.random().toString(36).substr(2, 9),
                status: 'confirmed',
                total: orderData.total,
                items: orderData.items
            });
        }, 2000);
    });
};