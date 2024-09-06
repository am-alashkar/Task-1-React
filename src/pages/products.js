// src/pages/Products.js

import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/productContx';
import Header from '../components/header';
import Footer from '../components/footer';



const Products = () => {
  const { products, loading, error, page, setPage, pageSize, setPageSize, searchTerm, setSearchTerm, titleFilter, setTitleFilter, brandFilter, setBrandFilter, categoryFilter, setCategoryFilter, tab, setTab , categories , setCategories } = useContext(ProductContext);
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size
    setPage(1); // Reset to page 1
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value); // Update title filter
    setPage(1); // Reset to page 1
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value); // Update brand filter
    setPage(1); // Reset to page 1
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value); // Update category filter
    setPage(1); // Reset to page 1
  };

  const handleTabChange = (newTab) => {
    setTab(newTab); // Update tab and fetch new data
    setPage(1); // Reset to page 1
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update page and fetch new data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter products based on search term and other filters
  const filteredProducts = products.filter(product => 
    (titleFilter ? product.title.toLowerCase().includes(titleFilter.toLowerCase()) : true) &&
    (brandFilter ? product.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true) &&
    (categoryFilter ? product.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true) &&
    (searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );
  
  // const categoryFilters = [];// = ['ALL', ...new Set(products.map(product => product.category))];
  // let categoryFilters =  [];// = [];
  // fetch('https://dummyjson.com/products/category-list');
  // let categoryFilters =  [];//axios.get('https://dummyjson.com/products/category-list');
  console.log(categories);
  return (
    <div>
      <Header />
      <main>
        <h2>Products</h2>

        {/* Tabs */}
        <div className="tabs">
          {categories.map((category, index) => (
            <button
              key={index}
              className={tab === category ? 'active' : ''}
              onClick={() => handleTabChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="filters">
          <label>
            Page Size:
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>

          <label>
            Search:
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by title" />
          </label>

          <label>
            Title Filter:
            <input type="text" value={titleFilter} onChange={handleTitleFilterChange} placeholder="Filter by title" />
          </label>

          <label>
            Brand Filter:
            <input type="text" value={brandFilter} onChange={handleBrandFilterChange} placeholder="Filter by brand" />
          </label>

          <label>
            Category Filter:
            <input type="text" value={categoryFilter} onChange={handleCategoryFilterChange} placeholder="Filter by category" />
          </label>
        </div>

        {/* Data Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
          <span>Page {page}</span>
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
