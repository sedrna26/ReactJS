// src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useProducts } from './ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet-async';
import { useDebounce } from '../hooks/useDebounce'; //
import OptimizedImage from './OptimizedImage'; // Asumo que tienes este componente para lazy-loading de imágenes
import { LIMITS } from '../utils/constants'; //

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
  // Nuevos componentes para paginación
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationButton,
  PaginationNumbers,
  PaginationNumber,
  ItemsPerPageSelector
} from './ProductList.styles';

const ProductList = ({ onAddToCart }) => {

  const { products: contextProducts, loading: contextLoading, error: contextError, fetchProducts: refetchAllProducts } = useProducts();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // Usamos el hook useDebounce con el valor de LIMITS.SEARCH_DEBOUNCE_MS para el retardo
  const debouncedSearchTerm = useDebounce(searchTerm, LIMITS.SEARCH_DEBOUNCE_MS); //
  const [sortBy, setSortBy] = useState('name');

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 9 productos por página por defecto

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

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy, itemsPerPage]);

  const handleRetry = () => {
    refetchAllProducts();
  };

  const filteredProducts = contextProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    // Aquí usamos debouncedSearchTerm para el filtrado, no searchTerm directamente
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()); // También para descripción
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

  // Cálculos de paginación
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Funciones de paginación
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <ProductListContainer>
      <Helmet>
        <title>Lista de Productos - E-commerce</title>
        <meta name="description" content="Explora nuestra amplia selección de productos y encuentra lo que necesitas." />
      </Helmet>

      <ProductListHeader>
        <h2>Nuestros Productos</h2>
        <FiltersContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
            <SearchIcon>
              <i className="fas fa-search"></i>
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

          <ItemsPerPageSelector>
            <label htmlFor="itemsPerPage">Mostrar:</label>
            <StyledSelect
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              aria-label="Productos por página"
            >
              <option value={6}>6 por página</option>
              <option value={9}>9 por página</option>
              <option value={12}>12 por página</option>
              <option value={18}>18 por página</option>
            </StyledSelect>
          </ItemsPerPageSelector>
        </FiltersContainer>
      </ProductListHeader>

      {contextLoading && <LoadingSpinner />}
      {contextError && <ErrorMessage message={contextError} onRetry={handleRetry} />}

      {!contextLoading && !contextError && sortedProducts.length === 0 && (
        <NoProductsMessage>
          <h3>No se encontraron productos.</h3>
          <p>Intenta ajustar tus filtros de búsqueda o categoría.</p>
        </NoProductsMessage>
      )}

      {!contextLoading && !contextError && sortedProducts.length > 0 && (
        <>
          {/* Información de paginación */}
          <PaginationInfo>
            Mostrando {startIndex + 1}-{Math.min(endIndex, totalProducts)} de {totalProducts} productos
            {debouncedSearchTerm && ( // Mostrar el término debounced
              <span> (filtrados por: "{debouncedSearchTerm}")</span>
            )}
            {selectedCategory !== 'all' && (
              <span> en categoría "{selectedCategory}"</span>
            )}
          </PaginationInfo>

          {/* Grid de productos */}
          <ProductsGrid>
            {currentProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductLink to={`/products/${product.id}`}>
                  <ProductImageContainer>
                    
                    <OptimizedImage //
                      src={product.image}
                      alt={product.name}
                      
                    />
                    {product.rating && (
                      <ProductRating>{product.rating.toFixed(1)} ★</ProductRating>
                    )}
                  </ProductImageContainer>
                  <ProductInfo>
                    <ProductCategoryBadge>{product.category}</ProductCategoryBadge>
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
            ))}
          </ProductsGrid>

          {/* Controles de paginación */}
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationControls>
                <PaginationButton
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  ← Anterior
                </PaginationButton>

                <PaginationNumbers>
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span style={{ padding: '0 5px', color: '#666' }}>...</span>
                      ) : (
                        <PaginationNumber
                          onClick={() => goToPage(page)}
                          $active={page === currentPage}
                          aria-label={`Ir a la página ${page}`}
                          aria-current={page === currentPage ? 'page' : undefined}
                        >
                          {page}
                        </PaginationNumber>
                      )}
                    </React.Fragment>
                  ))}
                </PaginationNumbers>

                <PaginationButton
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                >
                  Siguiente →
                </PaginationButton>
              </PaginationControls>
            </PaginationContainer>
          )}
        </>
      )}
    </ProductListContainer>
  );
};

export default ProductList;