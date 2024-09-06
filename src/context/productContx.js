// src/context/productContx.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tab, setTab] = useState('ALL');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products`;
        if (tab !== 'ALL') {
          url += '/category/' + tab;
        }
        url += `?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
        const response = await axios.get(url);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      if (categories.length > 0) {
        return;
      }
      try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        setCategories(response.data); // Save the categories in the state
        // setLoading(false);
      } catch (error) {
        setError(error.message);
        // setLoading(false);
      }
    };
    fetchCategories();
    fetchProducts();
  }, [page, pageSize, titleFilter, brandFilter, categoryFilter, tab , categories]);

  return (
    <ProductContext.Provider value={{ products, loading, error, page, setPage, pageSize, setPageSize, searchTerm, setSearchTerm, titleFilter, setTitleFilter, brandFilter, setBrandFilter, categoryFilter, setCategoryFilter, tab, setTab , categories, setCategories }}>
      {children}
    </ProductContext.Provider>
  );
};
