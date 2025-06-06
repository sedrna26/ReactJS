import React from 'react';

const Layout = ({ children, cartItemsCount, currentView, onViewChange }) => {
    return (
        <div className="layout">
            <header className="header">
                <div className="header-content">
                    <h1 className="logo">🛒 Mi Tienda Online</h1>
                    <nav className="navigation">
                        <button
                            className={`nav-btn ${currentView === 'products' ? 'active' : ''}`}
                            onClick={() => onViewChange('products')}
                        >
                            Productos
                        </button>
                        <button
                            className={`nav-btn cart-btn ${currentView === 'cart' ? 'active' : ''}`}
                            onClick={() => onViewChange('cart')}
                        >
                            Carrito
                            {cartItemsCount > 0 && (
                                <span className="cart-badge">{cartItemsCount}</span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Mi Tienda Online. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;