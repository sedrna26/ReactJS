// URLs y configuración de API
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://6629ff0a67df268010a2372d.mockapi.io/api/v1',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3
};

// Configuración de la aplicación
export const APP_CONFIG = {
    NAME: import.meta.env.VITE_APP_NAME || 'Mi Tienda Online',
    VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    DESCRIPTION: 'Tu destino para las mejores compras online'
};

// Breakpoints para responsive design
export const BREAKPOINTS = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    large: '1200px'
};

// Colores del tema
export const COLORS = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40'
};

// Configuración de localStorage
export const STORAGE_KEYS = {
    USER: 'mi_tienda_user',
    CART: 'mi_tienda_cart',
    ORDERS: 'mi_tienda_orders',
    PREFERENCES: 'mi_tienda_preferences'
};

// Límites y validaciones
export const LIMITS = {
    MAX_CART_QUANTITY: 10,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PRODUCT_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    SEARCH_DEBOUNCE_MS: 300
};