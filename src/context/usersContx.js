// src/context/usersContx.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // State for page size
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Fetch users based on page, pageSize, and other filters
    axios.get(`https://dummyjson.com/users?limit=${pageSize}&skip=${(page - 1) * pageSize}`)
      .then(response => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, pageSize, filter]);

  return (
    <UserContext.Provider value={{ users, loading, error, page, setPage, pageSize, setPageSize, searchTerm, setSearchTerm, filter, setFilter }}>
      {children}
    </UserContext.Provider>
  );
};
