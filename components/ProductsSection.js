import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ProductsContainer = styled.section`
  padding: 100px 20px;
  background-color: #1A1A1A;
`;

const Product = styled.div`
  margin-bottom: 80px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-out;
  
  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProductTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProductDescription = styled.p`
  color: #ccc;
`;

const ProductsSection = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  
  return (
    <ProductsContainer>
      <Product ref={ref1} className={inView1 ? 'is-visible' : ''}>
        <ProductTitle>Discord Cloner</ProductTitle>
        <ProductDescription>
          Beschreibung des Discord Cloners...
        </ProductDescription>
      </Product>
      <Product ref={ref2} className={inView2 ? 'is-visible' : ''}>
        <ProductTitle>Discord Server Cloner</ProductTitle>
        <ProductDescription>
          Beschreibung des Discord Server Cloners...
        </ProductDescription>
      </Product>
      {/* Weitere Produkte */}
    </ProductsContainer>
  );
};

export default ProductsSection;
