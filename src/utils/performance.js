// =============================================================================
// ARCHIVO: src/utils/performance.js
// Utilidades para optimización de rendimiento
// =============================================================================

// Debounce para optimizar búsquedas
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Lazy loading para imágenes
export const lazyLoadImage = (src, callback) => {
    const img = new Image();
    img.onload = () => callback(src);
    img.onerror = () => callback('/placeholder-image.jpg');
    img.src = src;
};

// Memoización simple para cachear resultados
export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// =============================================================================
// ARCHIVO: src/components/OptimizedImage.jsx
// Componente de imagen optimizada con lazy loading
// =============================================================================

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9em;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const OptimizedImage = ({ src, alt, className, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [inView, setInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView && src) {
            const img = new Image();
            img.onload = () => {
                setImageSrc(src);
                setLoaded(true);
            };
            img.onerror = () => {
                setImageSrc('/placeholder-image.jpg');
                setLoaded(true);
            };
            img.src = src;
        }
    }, [inView, src]);

    return (
        <ImageContainer ref={imgRef} className={className} {...props}>
            {!loaded && <Placeholder>Cargando...</Placeholder>}
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt={alt}
                    loaded={loaded}
                    loading="lazy"
                />
            )}
        </ImageContainer>
    );
};

export default OptimizedImage;

// =============================================================================
// ARCHIVO: src/hooks/useDebounce.js
// Hook personalizado para debounce
// =============================================================================

import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// =============================================================================
// ARCHIVO: src/hooks/useLocalStorage.js
// Hook para manejo optimizado de localStorage
// =============================================================================

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // Obtener valor inicial del localStorage o usar el valor por defecto
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Función para actualizar el valor
    const setValue = (value) => {
        try {
            // Permitir que value sea una función como useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
};

// =============================================================================
// ARCHIVO: src/utils/errorBoundary.js
// Error Boundary para manejo de errores en producción
// =============================================================================

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log del error para monitoreo en producción
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Aquí podrías enviar el error a un servicio de monitoreo
        // como Sentry, LogRocket, etc.
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    margin: '2rem'
                }}>
                    <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                        ¡Algo salió mal!
                    </h2>
                    <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                        Ha ocurrido un error inesperado. Por favor, recarga la página.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Recargar Página
                    </button>
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                            <summary>Detalles del error (modo desarrollo)</summary>
                            <pre style={{
                                backgroundColor: '#f8f8f8',
                                padding: '1rem',
                                overflow: 'auto',
                                fontSize: '0.8em'
                            }}>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// =============================================================================
// ARCHIVO: src/utils/constants.js
// Constantes globales de la aplicación
// =============================================================================

// URLs y configuración de API
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://68803b4ff1dcae717b615b5e.mockapi.io/api/v1',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3
};

// Configuración de la aplicación
export const APP_CONFIG = {
    NAME: process.env.REACT_APP_APP_NAME || 'Mi Tienda Online',
    VERSION: process.env.REACT_APP_VERSION || '1.0.0',
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

// =============================================================================
// Ejemplo de uso de las optimizaciones en ProductList.jsx
// =============================================================================

/*
// En el componente ProductList, reemplazar:

import { useDebounce } from '../hooks/useDebounce';
import OptimizedImage from './OptimizedImage';
import { LIMITS } from '../utils/constants';

const ProductList = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, LIMITS.SEARCH_DEBOUNCE_MS);
  
  // Usar debouncedSearchTerm en lugar de searchTerm para filtrar
  const filteredProducts = contextProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    // ... resto del filtrado
  });

  // En el JSX, reemplazar ProductImage con:
  <OptimizedImage 
    src={product.image} 
    alt={product.name}
    style={{ width: '100%', height: '250px' }}
  />
};
*/