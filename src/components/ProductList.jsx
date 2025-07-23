// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useProducts } from './ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet-async';

import {
  ProductListContainer,
  ProductListHeader,
  FiltersContainer,
  SearchContainer,
  SearchInput,
  SearchIcon,
  StyledSelect,
  NoProductsMessage,
  ProductsGrid,
  ProductCard,
  ProductLink,
  ProductImageContainer,
  ProductImage,
  ProductRating,
  ProductInfo,
  ProductCategoryBadge,
  ProductName,
  ProductDescription,
  ProductFooter,
  ProductPrice,
  ProductActions,
  ViewDetailsButton,
  AddToCartButton,
} from './ProductList.styles'; // Asegúrate de importar todos los componentes estilizados

const ProductList = ({ onAddToCart }) => {
  const { products: contextProducts, loading: contextLoading, error: contextError, fetchProducts: refetchAllProducts } = useProducts();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // En lugar de fetchCategories(), usa las categorías del contexto si ya las tienes disponibles
        // Si ProductContext ya carga las categorías, puedes obtenerlas de allí:
        // const { categories: contextCategories } = useProducts();
        // setCategories(contextCategories);
        // O si quieres mantener la carga separada, asegúrate de que api.fetchCategories funcione:
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error al cargar categorías:", err.message);
      }
    };
    loadCategories();
  }, []);

  const handleRetry = () => {
    refetchAllProducts();
  };

  const filteredProducts = contextProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    }
    if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <ProductListContainer> {/* Usar componente estilizado */}
      <Helmet>
        <title>Lista de Productos - E-commerce</title>
        <meta name="description" content="Explora nuestra amplia selección de productos y encuentra lo que necesitas." />
      </Helmet>

      <ProductListHeader> {/* Usar componente estilizado */}
        <h2>Nuestros Productos</h2>
        <FiltersContainer> {/* Usar componente estilizado */}
          <SearchContainer> {/* Usar componente estilizado */}
            <SearchInput
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
            <SearchIcon> {/* Usar componente estilizado */}
              <i className="fas fa-search"></i> {/* Asegúrate de que Font Awesome esté configurado si usas esta clase */}
            </SearchIcon>
          </SearchContainer>

          <StyledSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filtrar por categoría"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </StyledSelect>

          <StyledSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Ordenar productos por"
          >
            <option value="name">Ordenar por Nombre</option>
            <option value="priceAsc">Precio: Menor a Mayor</option>
            <option value="priceDesc">Precio: Mayor a Menor</option>
          </StyledSelect>
        </FiltersContainer>
      </ProductListHeader>

      {contextLoading && <LoadingSpinner />}
      {contextError && <ErrorMessage message={contextError} onRetry={handleRetry} />}

      {!contextLoading && !contextError && sortedProducts.length === 0 && (
        <NoProductsMessage> {/* Usar componente estilizado */}
          <h3>No se encontraron productos.</h3>
          <p>Intenta ajustar tus filtros de búsqueda o categoría.</p>
        </NoProductsMessage>
      )}

      {!contextLoading && !contextError && sortedProducts.length > 0 && (
        <ProductsGrid> {/* Usar componente estilizado */}
          {sortedProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}> {/* Clase de Bootstrap */}
              <ProductCard> {/* Usar componente estilizado */}
                <ProductLink to={`/products/${product.id}`}>
                  <ProductImageContainer> {/* Usar componente estilizado */}
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
                    />
                    {product.rating && (
                      <ProductRating>{product.rating.toFixed(1)} ★</ProductRating>
                    )}
                  </ProductImageContainer>
                  <ProductInfo> {/* Usar componente estilizado */}
                    <ProductCategoryBadge>{product.category}</ProductCategoryBadge> {/* Usar componente estilizado */}
                    <ProductName>{product.name}</ProductName> {/* Usar componente estilizado */}
                    <ProductDescription> {/* Usar componente estilizado */}
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description
                      }
                    </ProductDescription>
                  </ProductInfo>
                </ProductLink>
                <ProductFooter> {/* Usar componente estilizado */}
                  <ProductPrice>${product.price.toFixed(2)}</ProductPrice> {/* Usar componente estilizado */}
                  <ProductActions> {/* Usar componente estilizado */}
                    <ViewDetailsButton
                      to={`/products/${product.id}`}
                      aria-label={`Ver detalles de ${product.name}`}
                    >
                      Ver Detalles
                    </ViewDetailsButton>
                    <AddToCartButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      aria-label={`Agregar ${product.name} al carrito`}
                    >
                      Agregar al Carrito
                    </AddToCartButton>
                  </ProductActions>
                </ProductFooter>
              </ProductCard>
            </div>
          ))}
        </ProductsGrid>
      )}
    </ProductListContainer>
  );
};

export default ProductList;