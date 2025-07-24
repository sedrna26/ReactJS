// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HelmetProvider } from 'react-helmet-async';

// Importaciones de tus componentes existentes
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ErrorMessage from './components/ErrorMessage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Importamos el hook useLocalStorage
import { useLocalStorage } from './hooks/useLocalStorage';
// Importamos el ErrorBoundary
import ErrorBoundary from './utils/errorBoundary.jsx';

import CompatibilityChecker from './components/CompatibilityChecker.jsx';

import { ProductProvider } from './components/ProductContext';
import { AuthProvider } from './components/AuthContext';

import { GlobalStyle, TextCenter, Mt, Mb, P, FadeIn } from './App.styles';

// Componente de loading para Suspense. Puedes crear un componente más elaborado.
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '1.2em',
    color: '#6c757d'
  }}>
    Cargando componente...
  </div>
);

// Lazy loading de componentes.
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));
const Profile = lazy(() => import('./components/Profile'));

function App() {
  const [cartItems, setCartItems] = useLocalStorage('mi_tienda_cart', []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast.success('Producto añadido al carrito!');
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
    toast.info('Producto eliminado del carrito.');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    toast.info('Cantidad del producto actualizada.');
  };

  const processCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn('El carrito está vacío. No se puede procesar la compra.');
      return;
    }

    // Calcular el total con manejo preciso de decimales
    const total = cartItems.reduce((total, item) => {
      // Convertir precio y cantidad a números y manejar decimales correctamente
      const itemPrice = parseFloat((parseFloat(item.price) || 0).toFixed(2));
      const quantity = parseInt(item.quantity) || 0;
      const itemTotal = itemPrice * quantity;
      return total + itemTotal;
    }, 0);

    // Redondear el total final a 2 decimales
    const roundedTotal = parseFloat(total.toFixed(2));

    const order = {
      id: Date.now(),
      items: [...cartItems],
      total: roundedTotal,
      date: new Date().toISOString(),
      status: 'completed'
    };

    const existingOrders = JSON.parse(localStorage.getItem('mi_tienda_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('mi_tienda_orders', JSON.stringify(existingOrders));

    setCartItems([]);
    toast.success(`¡Compra realizada con éxito! Total: $${roundedTotal.toFixed(2)}`);
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <HelmetProvider>
      <GlobalStyle />
      <ErrorBoundary>
        <AuthProvider>
          <ProductProvider>
            <Router>
              <Layout cartItemsCount={totalItemsInCart}>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <FadeIn>
                          <ProductList onAddToCart={addToCart} />
                        </FadeIn>
                      }
                    />
                    <Route
                      path="/products"
                      element={
                        <FadeIn>
                          <ProductList onAddToCart={addToCart} />
                        </FadeIn>
                      }
                    />
                    <Route
                      path="/products/:id"
                      element={<ProductDetail onAddToCart={addToCart} />}
                    />
                    <Route
                      path="/login"
                      element={<Login />}
                    />
                    <Route
                      path="/register"
                      element={<Register />}
                    />

                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart
                            cartItems={cartItems}
                            onRemoveFromCart={removeFromCart}
                            onUpdateQuantity={updateQuantity}
                            onCheckout={processCheckout}
                          />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <OrderHistory />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <ErrorBoundary>
                            <AdminDashboard />
                          </ErrorBoundary>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="*"
                      element={<ErrorMessage message="Página no encontrada" />}
                    />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
          </ProductProvider>
          {/* CompatibilityChecker solo se renderiza en modo de desarrollo */}
          {import.meta.env.DEV && <CompatibilityChecker />}
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;