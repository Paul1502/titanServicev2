import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductsContainer = styled.section`
  padding: 100px 20px;
  background-color: #0A0A0A;
`;

const Product = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  width: 50%;
  max-width: 500px;
  margin: 0 20px;

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const ProductContent = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const ProductTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 2.5rem;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ProductsSection = () => {
  const controls = useAnimation();

  const [ref1, inView1] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView1) {
      controls.start('visible');
    }
  }, [controls, inView1]);

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <ProductsContainer id="products">
      <Product
        ref={ref1}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <ProductImage src="/images/product1.png" alt="Discord Cloner" />
        <ProductContent>
          <ProductTitle>Discord Cloner</ProductTitle>
          <ProductDescription>
            Klonen Sie Discord-Server und -Kanäle mit Leichtigkeit...
          </ProductDescription>
        </ProductContent>
      </Product>

      {/* Weitere Produkte können auf ähnliche Weise hinzugefügt werden */}

    </ProductsContainer>
  );
};

export default ProductsSection;
