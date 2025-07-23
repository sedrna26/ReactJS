import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductDetailContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

export const Breadcrumb = styled.div`
    margin-bottom: 20px;
    font-size: 0.9em;
    color: #666;

    a {
        color: #667eea;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .current {
        font-weight: bold;
        color: #333;
    }
`;

export const ProductDetailWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px;
    }
`;

export const ProductImageSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProductDetailImage = styled.img`
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const ProductInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ProductCategory = styled.div`
    color: #667eea;
    font-size: 0.8em;
    font-weight: bold;
    letter-spacing: 1px;
`;

export const ProductTitle = styled.h1`
    font-size: 2em;
    font-weight: bold;
    color: #333;
    margin: 0;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 1.5em;
    }
`;

export const ProductRating = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Stars = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const Star = styled.span`
   
    color: ${props => (props.$filled ? '#ffc107' : '#e4e5e9')}; // Color oro para llenas, gris para vacías
    font-size: 1.2em;
    margin-right: 2px;
    display: flex; // Asegura que el icono de la estrella esté bien centrado si es un SVG, etc.
    align-items: center;
`;


export const RatingText = styled.span`
    color: #666;
    font-size: 0.9em;
`;

export const ProductPrice = styled.div`
    font-size: 2.5em;
    font-weight: bold;
    color: #e74c3c;
    margin: 10px 0;

    @media (max-width: 768px) {
        font-size: 2em;
    }
`;

export const ProductDescription = styled.p`
    color: #666;
    line-height: 1.6;
    font-size: 1.1em;
`;

export const PurchaseSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    @media (max-width: 480px) {
        gap: 15px;
    }
`;

export const QuantitySelector = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    label {
        font-weight: bold;
        color: #333;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`;

export const QuantityInput = styled.input`
    width: 80px;
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1em;
    text-align: center;

    &:focus {
        outline: none;
        border-color: #667eea;
    }
`;

export const AddToCartBtn = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const BackButton = styled(Link)`
    background: #6c757d;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background: #5a6268;
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        text-align: center;
        justify-content: center;
    }
`;

export const ViewCartButton = styled(Link)`
    background: #28a745;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background: #218838;
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        text-align: center;
        justify-content: center;
    }
`;

export const BackButtonContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;
