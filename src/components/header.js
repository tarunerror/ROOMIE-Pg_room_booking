import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>ROOMIE</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/pgs">Browse PGs</Link>
          </li>
          <li>
            <Link to="/add-pg">List Your PG</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;