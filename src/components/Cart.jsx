import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    CartContainer,
    CartTitle,
    EmptyCartMessage,
    ContinueShoppingButton,
    CartItemsContainer,
    CartItem,
    CartItemLink,
    CartItemImage,
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

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }) => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <CartContainer>
                <Helmet>
                    <title>Carrito de Compras Vacío - Mi Tienda Online</title>
                    <meta name="description" content="Tu carrito de compras está vacío. Descubre nuestros productos y añade algunos." />
                    <link rel="canonical" href="http://www.mitiendaonline.com/cart" /> {/* Reemplaza con tu URL real */}
                </Helmet>
                <CartTitle>Carrito de Compras</CartTitle>
                <EmptyCartMessage>
                    <p>Tu carrito está vacío</p>
                    <p>¡Agrega algunos productos!</p>
                    <ContinueShoppingButton to="/products">
                        Continuar Comprando
                    </ContinueShoppingButton>
                </EmptyCartMessage>
            </CartContainer>
        );
    }

    return (
        <CartContainer>
            <Helmet>
                <title>Carrito de Compras ({cartItems.length}) - Mi Tienda Online</title>
                <meta name="description" content={`Tienes ${cartItems.length} productos en tu carrito de compras.`} />
                <link rel="canonical" href="http://www.mitiendaonline.com/cart" /> {/* Reemplaza con tu URL real */}
            </Helmet>
            <CartTitle>Carrito de Compras ({cartItems.length} productos)</CartTitle>
            <CartItemsContainer>
                {cartItems.map(item => (
                    <CartItem key={item.id}>
                        <CartItemLink to={`/products/${item.id}`}>
                            <CartItemImage
                                src={item.image}
                                alt={item.name}
                            />
                            <CartItemInfo>
                                <h3>{item.name}</h3>
                                <p>Precio Unitario: ${item.price.toFixed(2)}</p>
                            </CartItemInfo>
                        </CartItemLink>
                        <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                        <QuantitySelector>
                            <QuantityButton
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </QuantityButton>
                            <QuantityDisplay>{item.quantity}</QuantityDisplay>
                            <QuantityButton
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </QuantityButton>
                        </QuantitySelector>
                        <ItemTotal>
                            ${(item.price * item.quantity).toFixed(2)}
                        </ItemTotal>
                        <RemoveButton
                            onClick={() => onRemoveFromCart(item.id)}
                        >
                            Eliminar
                        </RemoveButton>
                    </CartItem>
                ))}
            </CartItemsContainer>
            <CartTotalContainer>
                <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
                <CartActions>
                    <ContinueShoppingButton to="/products">
                        Continuar Comprando
                    </ContinueShoppingButton>
                    <CheckoutButton onClick={onCheckout} disabled={cartItems.length === 0}>
                        Proceder al Pago
                    </CheckoutButton>
                </CartActions>
            </CartTotalContainer>
        </CartContainer>
    );
};

export default Cart;