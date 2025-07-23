import React, { useState, useEffect } from 'react';
import { useProducts } from './ProductContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ProductForm from './ProductForm';
import ConfirmationModal from './ConfirmationModal';
import { Helmet } from 'react-helmet-async'; // Importa Helmet

// Importa los componentes estilizados
import {
  AdminDashboardContainer,
  AdminHeader,
  AdminTitle,
  AddProductButton,
  Notification,
  ProductTableContainer,
  ProductTable,
  ProductImageAdmin,
  EditButton,
  DeleteButton,
  NoProductsMessage,
  ErrorContainer
} from './AdminDashboard.styles';

// Importa los iconos que podrías necesitar
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [notification, setNotification] = useState('');

  // UseEffect para cargar productos inicialmente o cuando cambie el error (para reintentar)
  useEffect(() => {
    if (!products.length && !loading && !error) {
      fetchProducts();
    }
  }, [products.length, loading, error, fetchProducts]);

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
      showNotification(result.success ? '✅ Producto agregado con éxito' : `❌ Error: ${result.error}`);
    }
    handleCloseForm();
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      const result = await deleteProduct(deletingProduct.id);
      showNotification(result.success ? '🗑️ Producto eliminado con éxito' : `❌ Error: ${result.error}`);
      setDeletingProduct(null); // Cerrar modal
    }
  };

  const handleRetryFetch = () => {
    fetchProducts();
  };

  if (loading) {
    return <LoadingSpinner message="Cargando productos para el panel de administración..." />;
  }

  return (
    <AdminDashboardContainer>
      <Helmet>
        <title>Panel de Administración - Mi Tienda Online</title>
        <meta name="description" content="Gestiona productos de tu tienda online: añade, edita y elimina productos." />
        <link rel="canonical" href="http://www.mitiendaonline.com/admin" /> {/* Reemplaza con tu URL real */}
      </Helmet>

      <AdminHeader>
        <AdminTitle>Gestión de Productos</AdminTitle>
        <AddProductButton onClick={() => handleOpenForm()}>
          <FaPlus /> Añadir Nuevo Producto
        </AddProductButton>
      </AdminHeader>

      {notification && <Notification>{notification}</Notification>}

      {error ? (
        <ErrorContainer>
          <ErrorMessage message={`Error al cargar productos: ${error}`} onRetry={handleRetryFetch} />
        </ErrorContainer>
      ) : products.length === 0 ? (
        <NoProductsMessage>
          <h3>No hay productos disponibles</h3>
          <p>¡Es un buen momento para añadir el primero!</p>
          <AddProductButton onClick={() => handleOpenForm()}>
            <FaPlus /> Añadir Nuevo Producto
          </AddProductButton>
        </NoProductsMessage>
      ) : (
        <ProductTableContainer>
          <ProductTable>
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
                  <td><ProductImageAdmin src={product.image} alt={product.name} /></td>
                  <td>{product.name}</td>
                  <td>${parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <EditButton onClick={() => handleOpenForm(product)} aria-label={`Editar ${product.name}`}>
                      <FaEdit /> Editar
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteClick(product)} aria-label={`Eliminar ${product.name}`}>
                      <FaTrash /> Eliminar
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        </ProductTableContainer>
      )}

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
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;