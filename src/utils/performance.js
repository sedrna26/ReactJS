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