import React, { useState } from 'react';
import { addPG } from '../api/api';

const AddPG = () => {
  const [pgData, setPGData] = useState({
    name: '',
    address: '',
    price: '',
    amenities: '',
    description: '',
    capacity: '',
    gender: 'any',
    images: []
  });

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      setPGData({ ...pgData, images: e.target.files });
    } else {
      setPGData({ ...pgData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in pgData) {
        if (key === 'images') {
          for (let i = 0; i < pgData.images.length; i++) {
            formData.append('images', pgData.images[i]);
          }
        } else {
          formData.append(key, pgData[key]);
        }
      }
      await addPG(formData);
      alert('PG added successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding PG:', error);
      alert('Failed to add PG. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="PG Name" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price per month" onChange={handleChange} required />
      <input type="text" name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required />
      <select name="gender" onChange={handleChange} required>
        <option value="any">Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="file" name="images" multiple onChange={handleChange} required />
      <button type="submit">Add PG</button>
    </form>
  );
};

export default AddPG;