import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, cartItemsCount }) => {
    const location = useLocation();
    
    return (
        <div className="layout">
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">🛒 Mi Tienda Online</h1>
                    </Link>
                    <nav className="navigation">
                        <Link
                            to="/products"
                            className={`nav-btn ${location.pathname === '/products' || location.pathname === '/' ? 'active' : ''}`}
                        >
                            Productos
                        </Link>
                        <Link
                            to="/cart"
                            className={`nav-btn cart-btn ${location.pathname === '/cart' ? 'active' : ''}`}
                        >
                            Carrito
                            {cartItemsCount > 0 && (
                                <span className="cart-badge">{cartItemsCount}</span>
                            )}
                        </Link>
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