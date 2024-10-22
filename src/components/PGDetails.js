import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPGs, initiatePaytmPayment } from '../api/api';
import './PGDetails.css';

const PGDetails = () => {
  const [pg, setPG] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const response = await getPGs();
        const selectedPG = response.data.find(p => p._id === id);
        setPG(selectedPG);
      } catch (error) {
        console.error('Error fetching PG details:', error);
      }
    };
    fetchPG();
  }, [id]);

  const handleBooking = async () => {
    try {
      const bookingData = {
        pgId: pg._id,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        totalAmount: pg.price
      };
      const response = await initiatePaytmPayment(bookingData);
      
      // Create a form and submit it to redirect to Paytm payment page
      const form = document.createElement('form');
      form.method = 'post';
      form.action = `https://securegw-stage.paytm.in/order/process`; // Use the production URL for live payments

      for (const key in response.data) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = response.data[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (!pg) return <div>Loading...</div>;

  return (
    <div className="pg-details">
      <h2>{pg.name}</h2>
      <p>{pg.address}</p>
      <p>Price: ₹{pg.price}/month</p>
      <p>Capacity: {pg.capacity}</p>
      <p>Gender: {pg.gender}</p>
      <p>Description: {pg.description}</p>
      <h3>Amenities:</h3>
      <ul>
        {pg.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <h3>Images:</h3>
      <div className="pg-images">
        {pg.images.map((image, index) => (
          <img key={index} src={image} alt={`${pg.name} - ${index + 1}`} />
        ))}
      </div>
      <button onClick={handleBooking}>Book Now with Paytm</button>
    </div>
  );
};

export default PGDetails;