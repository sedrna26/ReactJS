// src/components/ProductDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { Helmet } from 'react-helmet-async';

// Importa los componentes estilizados
import {
    ProductDetailContainer,
    Breadcrumb,
    ProductDetailWrapper,
    ProductImageSection,
    ProductDetailImage,
    ProductInfoSection,
    ProductCategory,
    ProductTitle,
    ProductRating,
    Stars,
    Star, // Asegúrate de que Star esté importado
    RatingText,
    ProductPrice,
    ProductDescription,
    PurchaseSection,
    QuantitySelector,
    QuantityInput,
    AddToCartBtn,
    ActionButtons,
    BackButton,
    ViewCartButton,
    BackButtonContainer
} from './ProductDetail.styles';


import { FaShoppingCart, FaArrowLeft, FaEye, FaStar } from 'react-icons/fa';

import { toast } from 'react-toastify';


const ProductDetail = ({ onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar el producto. Inténtalo de nuevo.');
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 10) {
            setQuantity(value);
        } else if (value < 1) {
            setQuantity(1);
        } else if (value > 10) {
            setQuantity(10);
        }
    };

    const handleAddToCart = () => {
        if (product && onAddToCart) {
            onAddToCart(product, quantity);
            toast.success(`${quantity} x ${product.name} añadido al carrito!`);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Cargando detalles del producto..." />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!product) {
        return <ErrorMessage message="Producto no encontrado." />;
    }

    return (
        <ProductDetailContainer>
            <Helmet>
                <title>{product ? `Detalle de ${product.name}` : 'Detalle del Producto'}</title>
                <meta name="description" content={`Detalles de ${product.name}: ${product.description}`} />
                <link rel="canonical" href={`http://www.mitiendaonline.com/products/${product.id}`} />
            </Helmet>

            <Breadcrumb>
                <Link to="/">Inicio</Link> &gt; <Link to="/products">Productos</Link> &gt; <span className="current">{product.name}</span>
            </Breadcrumb>

            <ProductDetailWrapper>
                <ProductImageSection>
                    <ProductDetailImage src={product.image} alt={product.name} />
                </ProductImageSection>

                <ProductInfoSection>
                    <ProductCategory>{product.category}</ProductCategory>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductRating>
                        <Stars>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} $filled={i < product.rating}> {/* CAMBIO CLAVE AQUÍ: Ahora es $filled */}
                                    <FaStar />
                                </Star>
                            ))}
                        </Stars>
                        <RatingText>({product.reviews} reseñas)</RatingText>
                    </ProductRating>
                    <ProductPrice>${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</ProductPrice>
                    <ProductDescription>{product.description}</ProductDescription>

                    <PurchaseSection>
                        <QuantitySelector>
                            <label htmlFor="quantity">Cantidad:</label>
                            <QuantityInput
                                type="number"
                                id="quantity"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={handleQuantityChange}
                                aria-label="Seleccionar cantidad"
                            />
                        </QuantitySelector>

                        <AddToCartBtn
                            onClick={handleAddToCart}
                            aria-label={`Agregar ${product.name} al carrito`}
                        >
                            <FaShoppingCart style={{ marginRight: '8px' }} /> Agregar al Carrito
                        </AddToCartBtn>
                    </PurchaseSection>

                    <ActionButtons>
                        <BackButton
                            onClick={() => navigate(-1)}
                            aria-label="Volver a la página anterior"
                        >
                            <FaArrowLeft style={{ marginRight: '8px' }} /> Volver
                        </BackButton>

                        <ViewCartButton to="/cart" aria-label="Ver el carrito de compras">
                            <FaEye style={{ marginRight: '8px' }} /> Ver Carrito
                        </ViewCartButton>
                    </ActionButtons>
                </ProductInfoSection>
            </ProductDetailWrapper>
        </ProductDetailContainer>
    );
};

export default ProductDetail;