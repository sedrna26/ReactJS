// Archivo: src/components/OrderHistory.jsx

import React from 'react';

const OrderHistory = () => {
    // Simulamos la obtención de datos de pedidos desde el almacenamiento local
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p>Aún no has realizado ninguna compra.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
              <p><strong>ID de Orden:</strong> {order.id}</p>
              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Items:</strong> {order.items.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;