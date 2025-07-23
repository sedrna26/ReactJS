
import React, { useState } from 'react';
import { useProducts } from './ProductContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ProductForm from './ProductForm';
import ConfirmationModal from './ConfirmationModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (productData) => {
    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, productData);
      showNotification(result.success ? '✅ Producto actualizado con éxito' : `❌ Error: ${result.error}`);
    } else {
      result = await addProduct(productData);
      showNotification(result.success ? '✅ Producto creado con éxito' : `❌ Error: ${result.error}`);
    }
    if (result.success) handleCloseForm();
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      const result = await deleteProduct(deletingProduct.id);
      showNotification(result.success ? '🗑️ Producto eliminado con éxito' : `❌ Error: ${result.error}`);
      setDeletingProduct(null);
    }
  };

  if (loading) return <LoadingSpinner message="Cargando productos..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

  return (
    <div className="admin-dashboard">
      <h2>⚙️ Panel de Administración</h2>
      <div className="admin-header">
        <h3>Gestión de Productos ({products.length})</h3>
        <button onClick={() => handleOpenForm()} className="add-product-btn">
          + Agregar Producto
        </button>
      </div>

      {notification && <div className="notification">{notification}</div>}

      <div className="product-list-admin">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><img src={product.image} alt={product.name} className="product-image-admin" /></td>
                <td>{product.name}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleOpenForm(product)} className="btn-edit">Editar</button>
                  <button onClick={() => handleDeleteClick(product)} className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm
          onSubmit={handleFormSubmit}
          initialData={editingProduct}
          onCancel={handleCloseForm}
        />
      )}

      <ConfirmationModal
        isOpen={!!deletingProduct}
        message={`¿Estás seguro de que quieres eliminar "${deletingProduct?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
};

export default AdminDashboard;