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
    Star,
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
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const productData = await fetchProductById(id);

                const transformedProduct = {
                    id: productData.id,
                    name: productData.title,
                    price: parseFloat(productData.price),
                    image: productData.image,
                    description: productData.description,
                    category: productData.category,
                    rating: productData.rating
                };

                setProduct(transformedProduct);
            } catch (err) {
                setError(err.message);
                toast.error(`Error al cargar el producto: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                onAddToCart(product);
            }
            toast.success(`${quantity} x ${product.name} agregado(s) al carrito!`);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Cargando producto..." />;
    }

    if (error) {
        return (
            <ProductDetailContainer>
                <Helmet> {/* Helmet para la página de error */}
                    <title>Error - Producto no encontrado</title>
                    <meta name="description" content="Ha ocurrido un error al cargar el producto o el producto no fue encontrado." />
                </Helmet>
                <ErrorMessage
                    message={error}
                    onRetry={() => window.location.reload()}
                />
                <BackButtonContainer>
                    <BackButton to="/products">
                        <FaArrowLeft style={{ marginRight: '8px' }} /> Volver a productos
                    </BackButton>
                </BackButtonContainer>
            </ProductDetailContainer>
        );
    }

    if (!product) {
        return (
            <ProductDetailContainer>
                <Helmet> {/* Helmet para el caso de producto no encontrado */}
                    <title>Producto no encontrado - Mi Tienda</title>
                    <meta name="description" content="El producto que buscas no existe o ha sido eliminado." />
                </Helmet>
                <ErrorMessage message="Producto no encontrado" />
                <BackButtonContainer>
                    <BackButton to="/products">
                        <FaArrowLeft style={{ marginRight: '8px' }} /> Volver a productos
                    </BackButton>
                </BackButtonContainer>
            </ProductDetailContainer>
        );
    }

    return (
        <ProductDetailContainer className="fade-in">
            <Helmet> {/* Helmet para la página de detalle del producto */}
                <title>{product.name} - Mi Tienda Online</title>
                <meta name="description" content={product.description?.substring(0, 160) + "..."} /> {/* Descripción corta para SEO */}
                <meta name="keywords" content={`${product.name}, ${product.category}, ${product.name} precio, comprar ${product.name}`} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description?.substring(0, 160) + "..."} />
                <meta property="og:image" content={product.image} />
                <meta property="og:url" content={`http://www.mitiendaonline.com/products/${product.id}`} /> {/* URL real del producto */}
                <link rel="canonical" href={`http://www.mitiendaonline.com/products/${product.id}`} /> {/* URL canónica */}
            </Helmet>

            <Breadcrumb>
                <Link to="/products">Productos</Link>
                <span> / </span>
                <span className="current">{product.name}</span>
            </Breadcrumb>

            <ProductDetailWrapper>
                <ProductImageSection>
                    <ProductDetailImage
                        src={product.image}
                        alt={product.name}
                    />
                </ProductImageSection>

                <ProductInfoSection>
                    <ProductCategory>
                        {product.category?.toUpperCase()}
                    </ProductCategory>

                    <ProductTitle>{product.name}</ProductTitle>

                    {product.rating && (
                        <ProductRating>
                            <Stars>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={i < Math.floor(product.rating.rate) ? 'filled' : ''}
                                        aria-label={`${i + 1} estrellas`}
                                    >
                                        <FaStar />
                                    </Star>
                                ))}
                            </Stars>
                            <RatingText>
                                {product.rating.rate} ({product.rating.count} reseñas)
                            </RatingText>
                        </ProductRating>
                    )}

                    <ProductPrice>
                        ${product.price.toFixed(2)}
                    </ProductPrice>

                    <ProductDescription>
                        {product.description}
                    </ProductDescription>

                    <PurchaseSection>
                        <QuantitySelector>
                            <label htmlFor="quantity">Cantidad:</label>
                            <QuantityInput
                                id="quantity"
                                type="number"
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