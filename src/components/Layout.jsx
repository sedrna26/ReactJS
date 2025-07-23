import React from 'react';
import { useAuth } from './AuthContext';
import { Helmet } from 'react-helmet-async'; // Importa Helmet

// Importa los componentes estilizados y los iconos
import {
    PageWrapper,
    Header,
    Logo,
    Nav,
    NavItem,
    CartLink,
    CartCount,
    MainContent,
    Footer,
    UserActions,
    AuthButton,
    LogoutButton,
    UserGreeting
} from './Layout.styles';
import { FaShoppingCart, FaUserCircle, FaStore } from 'react-icons/fa'; // Importa los iconos

const Layout = ({ children, cartItemsCount }) => {
    const { user, logout } = useAuth();

    return (
        <PageWrapper>
            <Helmet>
                <title>Mi Tienda Online - Inicio</title>
                <meta name="description" content="Tu destino para las mejores compras online. Descubre productos de alta calidad y ofertas increíbles." />
                <meta name="keywords" content="tienda online, e-commerce, compras, productos, mejor precio" />
                <link rel="canonical" href="http://www.mitiendaonline.com/" /> {/* Reemplaza con tu URL real */}
            </Helmet>

            <Header>
                <Logo to="/">
                    <FaStore /> Mi Tienda
                </Logo>
                <Nav>
                    <NavItem to="/products">Productos</NavItem>
                    {user && user.role === 'admin' && (
                        <NavItem to="/admin">Admin</NavItem>
                    )}
                    {user && (
                        <NavItem to="/orders">Mis Pedidos</NavItem>
                    )}
                </Nav>
                <UserActions>
                    {user ? (
                        <>
                            <UserGreeting to="/profile" aria-label={`Ver perfil de ${user.name}`}>
                                <FaUserCircle /> Hola, {user.name.split(' ')[0]}
                            </UserGreeting>
                            <LogoutButton onClick={logout} aria-label="Cerrar sesión">
                                Cerrar Sesión
                            </LogoutButton>
                        </>
                    ) : (
                        <>
                            <AuthButton to="/login">Iniciar Sesión</AuthButton>
                            <AuthButton to="/register">Registrarse</AuthButton>
                        </>
                    )}
                    <CartLink to="/cart" aria-label={`Ver carrito de compras con ${cartItemsCount} artículos`}>
                        <FaShoppingCart /> Carrito
                        {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
                    </CartLink>
                </UserActions>
            </Header>

            <MainContent>
                {children}
            </MainContent>

            <Footer>
                <p>&copy; 2024 Mi Tienda Online. Todos los derechos reservados.</p>
            </Footer>
        </PageWrapper>
    );
};

export default Layout;