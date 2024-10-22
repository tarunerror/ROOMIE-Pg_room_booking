import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPGs } from '../api/api';
import './PGList.css';

const PGList = () => {
  const [pgs, setPGs] = useState([]);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await getPGs();
        setPGs(response.data);
      } catch (error) {
        console.error('Error fetching PGs:', error);
      }
    };
    fetchPGs();
  }, []);

  return (
    <div className="pg-list">
      <h2>Available PGs</h2>
      {pgs.map((pg) => (
        <div key={pg._id} className="pg-item">
          <img src={pg.images[0]} alt={pg.name} />
          <h3>{pg.name}</h3>
          <p>{pg.address}</p>
          <p>Price: ₹{pg.price}/month</p>
          <Link to={`/pg/${pg._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default PGList;