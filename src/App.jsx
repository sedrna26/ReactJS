
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
import './App.css';


function App() {
  // Estado para manejar el carrito de compras
  const [cartItems, setCartItems] = useState([]);

  //función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya existe en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        //Si existe, incrementar la cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Mostrar una notificación (opcional)
    console.log(`${product.name} agregado al carrito!`);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  //función para actualizar la cantidad de un producto
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
  };

  // Función para procesar checkout
  const processCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Simular procesamiento de orden
    const order = {
      id: Date.now(),
      items: [...cartItems],
      total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'completed'
    };

    // Guardar orden en localStorage (simulando base de datos)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Limpiar carrito
    setCartItems([]);
    alert('¡Compra realizada con éxito!');
  };

  // Calcular el número total de items en el carrito
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      {/* Envuelve todo con ProductProvider */}
      <ProductProvider>
        <Router>
          <Layout cartItemsCount={totalItemsInCart}>
            <Routes>
              <Route
                path="/"
                element={<ProductList onAddToCart={addToCart} />}
              />
              <Route
                path="/products"
                element={<ProductList onAddToCart={addToCart} />}
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
    </AuthProvider>
  );
}

export default App;
