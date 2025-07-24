import React from 'react';
import styled from 'styled-components';

const OrderHistoryContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const OrderCard = styled.li`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItems = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 0.9em;
  color: #666;
`;

const OrderHistory = () => {
  // Cambiamos la clave para que coincida con la usada en processCheckout
  const orders = JSON.parse(localStorage.getItem('mi_tienda_orders') || '[]');

  return (
    <OrderHistoryContainer>
      <h2>📋 Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <p>Aún no has realizado ninguna compra.</p>
      ) : (
        <OrderList>
          {orders.map(order => (
            <OrderCard key={order.id}>
              <p><strong>ID de Orden:</strong> #{order.id}</p>
              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

              <OrderItems>
                <h4>Productos:</h4>
                {order.items.map(item => (
                  <OrderItem key={item.id}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </OrderItem>
                ))}
              </OrderItems>

              <p><strong>Estado:</strong> {order.status}</p>
            </OrderCard>
          ))}
        </OrderList>
      )}
    </OrderHistoryContainer>
  );
};

export default OrderHistory;