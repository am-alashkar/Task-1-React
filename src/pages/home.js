// src/pages/Home.js

import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Home Page</h2>
        <p>Welcome to the home page. Navigate to Users or Products using the menu.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
