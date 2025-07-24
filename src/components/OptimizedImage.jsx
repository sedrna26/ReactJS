import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.$loaded ? 1 : 0};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9em;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const OptimizedImage = ({ src, alt, className, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [inView, setInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView && src) {
            const img = new window.Image();
            img.onload = () => {
                setImageSrc(src);
                setLoaded(true);
            };
            img.onerror = () => {
                setImageSrc('/placeholder.jpg');
                setLoaded(true);
            };
            img.src = src;
        }
    }, [inView, src]);

    return (
        <ImageContainer ref={imgRef} className={className} {...props}>
            {!loaded && <Placeholder>Cargando...</Placeholder>}
            {imageSrc && (
                <StyledImage
                    src={imageSrc}
                    alt={alt || 'Imagen'}
                    $loaded={loaded}
                    loading="lazy"
                />
            )}
        </ImageContainer>
    );
};

export default OptimizedImage;