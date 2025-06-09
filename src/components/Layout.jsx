import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Layout.css';

const Layout = ({ children, cartItemsCount }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, hasRole, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">🛒 Mi Tienda Online</h1>
                    </Link>

                    {/* Botón hamburguesa para móvil */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-label="Abrir menú"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`navigation ${showMobileMenu ? 'mobile-open' : ''}`}>
                        {/* Enlaces principales */}
                        <div className="nav-links">
                            <Link
                                to="/products"
                                className={`nav-btn ${location.pathname === '/products' || location.pathname === '/' ? 'active' : ''}`}
                                onClick={() => setShowMobileMenu(false)}
                            >
                                📱 Productos
                            </Link>

                            {isAuthenticated() && (
                                <>
                                    <Link
                                        to="/cart"
                                        className={`nav-btn cart-btn ${location.pathname === '/cart' ? 'active' : ''}`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        🛒 Carrito
                                        {cartItemsCount > 0 && (
                                            <span className="cart-badge">{cartItemsCount}</span>
                                        )}
                                    </Link>

                                    <Link
                                        to="/orders"
                                        className={`nav-btn ${location.pathname === '/orders' ? 'active' : ''}`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        📋 Mis Pedidos
                                    </Link>

                                    {hasRole('admin') && (
                                        <Link
                                            to="/admin"
                                            className={`nav-btn admin-btn ${location.pathname === '/admin' ? 'active' : ''}`}
                                            onClick={() => setShowMobileMenu(false)}
                                        >
                                            ⚙️ Admin
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Sección de usuario */}
                        <div className="user-section">
                            {isAuthenticated() ? (
                                <div className="user-menu-container">
                                    <button 
                                        className="user-menu-trigger"
                                        onClick={toggleUserMenu}
                                        aria-label="Menú de usuario"
                                    >
                                        <span className="user-avatar">
                                            {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                                        </span>
                                        <span className="user-name">{user?.name}</span>
                                        <span className="dropdown-arrow">▼</span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="user-dropdown">
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <strong>{user?.name}</strong>
                                                    <small>{user?.email}</small>
                                                    <span className="user-role">{user?.role}</span>
                                                </div>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <Link 
                                                to="/profile" 
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    setShowMobileMenu(false);
                                                }}
                                            >
                                                👤 Mi Perfil
                                            </Link>
                                            <Link 
                                                to="/orders" 
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    setShowMobileMenu(false);
                                                }}
                                            >
                                                📋 Mis Pedidos
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                            <button 
                                                className="dropdown-item logout-btn"
                                                onClick={handleLogout}
                                            >
                                                🚪 Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="auth-buttons">
                                    <Link 
                                        to="/login" 
                                        className="login-btn"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="register-btn"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Mi Tienda Online</h4>
                        <p>Tu tienda de confianza desde 2024</p>
                    </div>
                    <div className="footer-section">
                        <h4>Enlaces</h4>
                        <Link to="/products">Productos</Link>
                        {isAuthenticated() && <Link to="/orders">Mis Pedidos</Link>}
                    </div>
                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <p>Email: info@mitienda.com</p>
                        <p>Tel: (123) 456-7890</p>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Mi Tienda Online. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* Overlay para cerrar menús al hacer click fuera */}
            {(showUserMenu || showMobileMenu) && (
                <div 
                    className="overlay"
                    onClick={() => {
                        setShowUserMenu(false);
                        setShowMobileMenu(false);
                    }}
                ></div>
            )}
        </div>
    );
};

export default Layout;