import React from 'react';
import SearchBar from './SearchBar';
import Deals from './Deals';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Roomie</h1>
      <SearchBar />
      <Deals />
    </div>
  );
};

export default Home;