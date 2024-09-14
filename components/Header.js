import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
`;

const Logo = styled.img`
  width: 150px;
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.a`
  margin-left: 30px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    left: 0;
    bottom: -5px;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const JoinButton = styled(motion.a)`
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: #000;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  margin-left: 30px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="/images/logo.png" alt="Titan-Service Logo" />
      <NavMenu>
        <NavItem href="#products">Produkte</NavItem>
        <NavItem href="#contact">Kontakt</NavItem>
        <JoinButton
          href="https://discord.gg/your-invite-link"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Join Discord
        </JoinButton>
      </NavMenu>
    </HeaderContainer>
  );
};

export default Header;
