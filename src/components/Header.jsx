import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #cce7f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e1e1e;
`;

const Menu = styled.div`
  display: flex;
  gap: 1.2rem;

  a {
    font-size: 0.95rem;
    color: #1e1e1e;
    font-weight: 500;

    &:hover {
      color: #0077cc;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>📘 Livraria Baldez, Versiane</Logo>
        <Menu>
          <Link to="/">Início</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrinho">Carrinho</Link>
          <Link to="/login">Login</Link>
        </Menu>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
