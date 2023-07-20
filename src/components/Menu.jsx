import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="menu-container">
      <Navbar bg="earth" expand="lg" expanded={expanded}>
        <Navbar.Brand href="/">GarrApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggleMenu} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" onClick={handleToggleMenu}>Home</Link>
            <Link to="/mapa" onClick={handleToggleMenu}>Mapa</Link>
            <Link to="/informes" onClick={handleToggleMenu}>Informes</Link>
            <Link to="/sobre-garrapp" onClick={handleToggleMenu}>Sobre GarrApp</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
