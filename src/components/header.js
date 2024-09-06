// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const Header = () => {
  return (
    <header>
      <h1>Welcome to our application</h1>
      <nav>
        <p>Navigation:</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
