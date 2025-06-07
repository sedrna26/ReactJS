import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './ProductDetail.css';

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
                
                // Transformar los datos para que coincidan con nuestro formato
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
            // Agregar la cantidad especificada al carrito
            for (let i = 0; i < quantity; i++) {
                onAddToCart(product);
            }
            
            // Mostrar mensaje personalizado
            alert(`${quantity} x ${product.name} agregado(s) al carrito!`);
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
            <div className="product-detail-container">
                <ErrorMessage 
                    message={error} 
                    onRetry={() => window.location.reload()} 
                />
                <div className="back-button-container">
                    <Link to="/products" className="back-button">
                        ← Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-container">
                <ErrorMessage message="Producto no encontrado" />
                <div className="back-button-container">
                    <Link to="/products" className="back-button">
                        ← Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-container fade-in">
            <div className="breadcrumb">
                <Link to="/products">Productos</Link>
                <span> / </span>
                <span className="current">{product.name}</span>
            </div>

            <div className="product-detail">
                <div className="product-image-section">
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-detail-image"
                    />
                </div>

                <div className="product-info-section">
                    <div className="product-category">
                        {product.category?.toUpperCase()}
                    </div>
                    
                    <h1 className="product-title">{product.name}</h1>
                    
                    {product.rating && (
                        <div className="product-rating">
                            <div className="stars">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span 
                                        key={i} 
                                        className={i < Math.floor(product.rating.rate) ? 'star filled' : 'star'}
                                    >
                                        ⭐
                                    </span>
                                ))}
                            </div>
                            <span className="rating-text">
                                {product.rating.rate} ({product.rating.count} reseñas)
                            </span>
                        </div>
                    )}

                    <div className="product-price">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Cantidad:</label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="quantity-input"
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn primary"
                        >
                            Agregar al Carrito
                        </button>
                    </div>

                    <div className="action-buttons">
                        <button
                            onClick={() => navigate(-1)}
                            className="back-button secondary"
                        >
                            ← Volver
                        </button>
                        
                        <Link to="/cart" className="view-cart-button">
                            Ver Carrito
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;