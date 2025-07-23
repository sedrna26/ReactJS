import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Mixin para estilos de botones
const buttonStyles = css`
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85em;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
`;

export const ProductListContainer = styled.div`
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ProductListHeader = styled.div`
  margin-bottom: 30px;

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 400px;

  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`;

export const StyledSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const NoProductsMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    margin-bottom: 10px;
    color: #333;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-out; /* Animación de entrada */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  flex: 1;
`;

export const ProductImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & { /* Aplica la transformación cuando el ProductCard es hover */
    transform: scale(1.05);
  }
`;

export const ProductRating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
`;

export const ProductInfo = styled.div`
  padding: 18px;
  flex: 1;
`;

export const ProductCategoryBadge = styled.span`
  display: inline-block;
  background: #f8f9fa;
  color: #667eea;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const ProductName = styled.h3`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.3;
`;

export const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9em;
  margin: 0 0 18px 0;
  line-height: 1.5;
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-top: 1px solid #eee;
  background: #f8f9fa;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
`;

export const ProductPrice = styled.span`
  font-size: 1.4em;
  font-weight: bold;
  color: #e74c3c;
`;

export const ProductActions = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const ViewDetailsButton = styled(Link)`
  ${buttonStyles}
  background: #6c757d;
  color: white;
  box-shadow: 0 2px 6px rgba(108, 117, 125, 0.3);

  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(108, 117, 125, 0.4);
  }
`;

export const AddToCartButton = styled.button`
  ${buttonStyles}
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
  }
`;