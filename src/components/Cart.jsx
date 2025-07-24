// src/components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

// Importa solo los componentes que realmente existen y son necesarios
import {
    CartContainer,
    CartTitle,
    EmptyCartMessage,
    ContinueShoppingButton,
    CartItemsContainer,
    CartItem,
    CartItemInfo,
    ItemPrice,
    QuantitySelector,
    QuantityButton,
    QuantityDisplay,
    ItemTotal,
    RemoveButton,
    CartTotalContainer,
    TotalPrice,
    CartActions,
    CheckoutButton
} from './Cart.styles';

import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

// MODIFICADO: Recibe onCheckout en lugar de onClearCart
const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
    const subtotal = cartItems.reduce((sum, item) => {
        const itemPrice = parseFloat((parseFloat(item.price) || 0).toFixed(2));
        const quantity = parseInt(item.quantity) || 0;
        return sum + (itemPrice * quantity);
    }, 0);

    const shipping = subtotal > 0 ? 5.00 : 0;
    const total = parseFloat((subtotal + shipping).toFixed(2));

    const handleCheckout = () => {
        if (cartItems.length > 0) {

            onCheckout();
        } else {
            toast.error('Tu carrito está vacío. Añade productos antes de proceder al pago.');
        }
    };

    return (
        <CartContainer>
            <Helmet>
                <title>{cartItems.length > 0 ? `Tu Carrito (${cartItems.length} items)` : 'Carrito de Compras'}</title>
                <meta name="description" content="Revisa los productos en tu carrito de compras y procede al pago." />
                <link rel="canonical" href="https://reactjs-hr.netlify.app/cart" />
            </Helmet>

            <CartTitle>Tu Carrito de Compras</CartTitle>

            {cartItems.length === 0 ? (
                <EmptyCartMessage>
                    <p>Tu carrito está vacío</p>
                    <p>¡Agrega algunos productos!</p>
                    <Link to="/products">
                        <ContinueShoppingButton>
                            Continuar Comprando
                        </ContinueShoppingButton>
                    </Link>
                </EmptyCartMessage>
            ) : (
                <>
                    <CartItemsContainer>
                        {cartItems.map(item => (
                            <CartItem key={item.id}>
                                <Link to={`/products/${item.id}`}>
                                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }} />
                                </Link>
                                <CartItemInfo>
                                    <h3>{item.name}</h3>
                                    <ItemPrice>${parseFloat(item.price).toFixed(2)}</ItemPrice>
                                    <QuantitySelector>
                                        <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Disminuir cantidad de ${item.name}`}>
                                            <FaMinus />
                                        </QuantityButton>
                                        <QuantityDisplay>{item.quantity}</QuantityDisplay>
                                        <QuantityButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} aria-label={`Aumentar cantidad de ${item.name}`}>
                                            <FaPlus />
                                        </QuantityButton>
                                    </QuantitySelector>
                                    <ItemTotal>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </ItemTotal>
                                </CartItemInfo>
                                <RemoveButton onClick={() => onRemoveFromCart(item.id)} aria-label={`Eliminar ${item.name} del carrito`}>
                                    <FaTrash />
                                </RemoveButton>
                            </CartItem>
                        ))}
                    </CartItemsContainer>

                    <CartTotalContainer>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Envío:</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <hr />
                            <TotalPrice>Total: ${total.toFixed(2)}</TotalPrice>
                        </div>
                        <CartActions>
                            <ContinueShoppingButton to="/products">
                                Continuar Comprando
                            </ContinueShoppingButton>
                            <CheckoutButton onClick={handleCheckout} disabled={cartItems.length === 0}>
                                Proceder al Pago
                            </CheckoutButton>
                        </CartActions>
                    </CartTotalContainer>
                </>
            )}
        </CartContainer>
    );
};

export default Cart;