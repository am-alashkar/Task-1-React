// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/users';
import Products from './pages/products';
import Home from './pages/home';
import { UserProvider } from './context/usersContx'; // Import UserProvider
import { ProductProvider } from './context/productContx'; // Import ProductProvider

function App() {
  return (
    <Router>
      <UserProvider>
        <ProductProvider>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </ProductProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
