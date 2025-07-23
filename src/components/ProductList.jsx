import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './ProductList.css';
import { useProducts } from './ProductContext'; // Importar useProducts del contexto

const ProductList = ({ onAddToCart }) => {
  const { products: contextProducts, loading: contextLoading, error: contextError, fetchProducts: refetchAllProducts } = useProducts(); // Obtener del contexto

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Cargar solo las categorías al montar el componente
  // Los productos ahora vienen del contexto
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        // En un caso real, podrías manejar este error de categorías de otra forma
        console.error("Error al cargar categorías:", err.message);
      }
    };
    loadCategories();
  }, []);

  // Función para manejar el reintento si hay un error global de productos
  const handleRetry = () => {
    refetchAllProducts(); // Volver a cargar todos los productos desde el contexto
  };

  // Filtrar productos por búsqueda y categoría
  const filteredProductsBySearch = contextProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar por categoría (ahora se hace sobre los productos ya cargados por el contexto)
  const filteredProductsByCategory = selectedCategory === 'all'
    ? filteredProductsBySearch
    : filteredProductsBySearch.filter(product => product.category === selectedCategory);


  // Ordenar productos
  const sortedProducts = [...filteredProductsByCategory].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        // Asegúrate de que product.rating y product.rating.rate existan
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  if (contextLoading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (contextError) {
    return <ErrorMessage message={contextError} onRetry={handleRetry} />;
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Productos Disponibles ({sortedProducts.length})</h2>

        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="rating">Mejor valorado</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="no-products">
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda o cambia la categoría.</p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  {product.rating && (
                    <div className="product-rating">
                      ⭐ {product.rating.rate.toFixed(1)}
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description
                    }
                  </p>
                </div>
              </Link>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <div className="product-actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="view-details-btn"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="add-to-cart-btn"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;