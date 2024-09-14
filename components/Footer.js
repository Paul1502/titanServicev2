import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #0A0A0A;
  padding: 50px 20px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 10px;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer id="contact">
      <p>&copy; {new Date().getFullYear()} Titan-Service. Alle Rechte vorbehalten.</p>
      <p>
        <FooterLink href="/impressum">Impressum</FooterLink>|
        <FooterLink href="/datenschutz">Datenschutz</FooterLink>
      </p>
    </FooterContainer>
  );
};

export default Footer;
