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
} from './ProductList.styles';

const ProductList = ({ onAddToCart }) => {
  const { products: contextProducts, loading: contextLoading, error: contextError, fetchProducts: refetchAllProducts } = useProducts();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const loadCategories = async () => {
      try {
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
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      default:
        return 0;
    }
  });

  if (contextLoading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (contextError) {
    return (
      <ErrorMessage
        message={contextError}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <ProductListContainer className="container-fluid">
      <Helmet>
        <title>Productos - Mi Tienda Online</title>
        <meta name="description" content="Explora nuestra amplia selección de productos de alta calidad en Mi Tienda Online. Encuentra ofertas, productos nuevos y más." />
        <meta name="keywords" content="productos, tienda online, e-commerce, ofertas, compras, calidad" />
        <link rel="canonical" href="http://www.mitiendaonline.com/products" />
      </Helmet>

      <ProductListHeader>
        <h2>Productos Disponibles ({sortedProducts.length})</h2>

        <FiltersContainer className="row mb-3">
          <SearchContainer className="col-md-4 col-sm-12 mb-2">
            <SearchInput
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos por nombre o descripción"
            />
            <SearchIcon aria-hidden="true">🔍</SearchIcon>
          </SearchContainer>

          <div className="col-md-4 col-sm-6 mb-2">
            <StyledSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filtrar productos por categoría"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </StyledSelect>
          </div>

          <div className="col-md-4 col-sm-6 mb-2">
            <StyledSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar productos por"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
              <option value="rating">Mejor valorado</option>
            </StyledSelect>
          </div>
        </FiltersContainer>
      </ProductListHeader>

      {sortedProducts.length === 0 ? (
        <NoProductsMessage className="text-center py-5">
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda o cambia la categoría.</p>
        </NoProductsMessage>
      ) : (
        <ProductsGrid className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {sortedProducts.map(product => (
            <div key={product.id} className="col">
              <ProductCard className="h-100 shadow-sm">
                <ProductLink to={`/products/${product.id}`} aria-label={`Ver detalles de ${product.name}`}>
                  <ProductImageContainer>
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                    />
                    {product.rating && (
                      <ProductRating>
                        ⭐ {product.rating.rate.toFixed(1)}
                      </ProductRating>
                    )}
                  </ProductImageContainer>
                  <ProductInfo>
                    <ProductCategoryBadge className="bg-secondary text-white mb-2">{product.category}</ProductCategoryBadge> {/* Mantén clases de Bootstrap */}
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description
                      }
                    </ProductDescription>
                  </ProductInfo>
                </ProductLink>
                <ProductFooter>
                  <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                  <ProductActions>
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