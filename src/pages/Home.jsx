import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Deals from '../components/Deals';
import { getPGs, searchPGs } from '../api/api';
import './Home.css';

const Home = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      setLoading(true);
      const response = await getPGs();
      setPgs(response.data);
    } catch (error) {
      setError('Error fetching PGs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const response = await searchPGs(query);
      setPgs(response.data);
    } catch (error) {
      setError('Error searching PGs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <Deals />
      <div className="navigation-menu">
        <button onClick={() => handleSearch('most liked')}>Most Liked</button>
        <button onClick={() => handleSearch('trending')}>Trending</button>
        <button onClick={() => handleSearch('budget friendly')}>Budget-Friendly</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="pg-list">
        {pgs.slice(0, 10).map((pg) => (
          <div key={pg._id} className="pg-item">
            <h3>{pg.name}</h3>
            <p>{pg.address}</p>
            <p>₹{pg.price} per month</p>
            <p>Amenities: {pg.amenities.join(', ')}</p>
          </div>
        ))}
      </div>
      {pgs.length > 10 && <button className="view-more">View More</button>}
    </div>
  );
};

export default Home;