import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: transparent;
`;

const Logo = styled.img`
  width: 150px;
`;

const JoinButton = styled.a`
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: #000;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
    transition: all 0.3s ease;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="/images/logo.png" alt="Titan-Service Logo" />
      <JoinButton href="https://discord.gg/your-invite-link" target="_blank">
        Join Discord
      </JoinButton>
    </HeaderContainer>
  );
};

export default Header;
