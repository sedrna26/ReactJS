import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importa HelmetProvider
import { HelmetProvider } from 'react-helmet-async';

import Layout from './components/Layout';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ErrorMessage from './components/ErrorMessage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import OrderHistory from './components/OrderHistory';
import AdminDashboard from './components/AdminDashboard';

import { ProductProvider } from './components/ProductContext';
import { AuthProvider } from './components/AuthContext';

import { GlobalStyle, TextCenter, Mt, Mb, P, FadeIn } from './App.styles';
function App() {
  const [cartItems, setCartItems] = useState([]);

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

    const order = {
      id: Date.now(),
      items: [...cartItems],
      total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'completed'
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setCartItems([]);
    toast.success('¡Compra realizada con éxito!');
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <HelmetProvider>
      <GlobalStyle />
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Layout cartItemsCount={totalItemsInCart}>
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
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path="*"
                  element={<ErrorMessage message="Página no encontrada" />}
                />
              </Routes>
            </Layout>
          </Router>
        </ProductProvider>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;