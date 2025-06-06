import React, { useState } from 'react';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  // Estado para manejar el carrito de compras
  const [cartItems, setCartItems] = useState([]);

  // Estado para manejar la vista actual (productos o carrito)
  const [currentView, setCurrentView] = useState('products');

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya existe en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Si existe, incrementar la cantidad
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
    alert(`${product.name} agregado al carrito!`);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Función para actualizar la cantidad de un producto
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

  // Función para cambiar de vista
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Calcular el número total de items en el carrito
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Layout
      cartItemsCount={totalItemsInCart}
      currentView={currentView}
      onViewChange={handleViewChange}
    >
      {currentView === 'products' ? (
        <ProductList onAddToCart={addToCart} />
      ) : (
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </Layout>
  );
}

export default App;