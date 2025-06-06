import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="cart">
                <h2>Carrito de Compras</h2>
                <div className="empty-cart">
                    <p>Tu carrito está vacío</p>
                    <p>¡Agrega algunos productos!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Carrito de Compras ({cartItems.length} productos)</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                        />
                        <div className="cart-item-info">
                            <h4 className="cart-item-name">{item.name}</h4>
                            <p className="cart-item-price">${item.price}</p>
                        </div>
                        <div className="cart-item-controls">
                            <div className="quantity-controls">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="quantity-btn"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                            <div className="item-total">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                                onClick={() => onRemoveFromCart(item.id)}
                                className="remove-btn"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button className="checkout-btn">
                    Proceder al Pago
                </button>
            </div>
        </div>
    );
};

export default Cart;