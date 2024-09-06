// src/pages/Users.js

import React, { useContext, useState } from 'react';
import { UserContext } from '../context/usersContx';
import Header from '../components/header';
import Footer from '../components/footer';

const Users = () => {
  const { users, loading, error, page, setPage, pageSize, setPageSize, searchTerm, setSearchTerm, filter, setFilter } = useContext(UserContext);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size
    setPage(1); // Reset to page 1
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter
    setPage(1); // Reset to page 1
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <Header />
      <main>
        <h2>Users</h2>
        <div>
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
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by first name" />
          </label>

          <label>
            Filter:
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by any field" />
          </label>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Maiden Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Username</th>
              <th>Blood Group</th>
              <th>Eye Color</th>    
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.maidenName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.bloodGroup}</td>
                <td>{user.eyeColor}</td>
    
              </tr>
            ))}
          </tbody>
        </table>

        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </main>
      <Footer />
    </div>
  );
};

export default Users;
