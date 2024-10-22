import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPG } from '../api/api';
import './PGListing.css';

const PGListing = () => {
    const [pgData, setPgData] = useState({
        name: '',
        address: '',
        price: '',
        amenities: '',
        images: []
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPgData({ ...pgData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        // This is a placeholder for image upload functionality
        // In a real application, you would handle file uploads here
        console.log('Image upload:', e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(pgData).forEach(key => {
                if (key === 'amenities') {
                    formData.append(key, pgData[key].split(',').map(item => item.trim()));
                } else if (key === 'images') {
                    // Append each file individually
                    for (let i = 0; i < pgData.images.length; i++) {
                        formData.append('images', pgData.images[i]);
                    }
                } else {
                    formData.append(key, pgData[key]);
                }
            });

            await addPG(formData);
            navigate('/');
        } catch (error) {
            setError('Error adding PG listing');
        }
    };

    return (
        <div className="pg-listing">
            <h2>Add Your PG Listing</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="PG Name" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price per month" onChange={handleChange} required />
                <input type="text" name="amenities" placeholder="Amenities (comma-separated)" onChange={handleChange} required />
                <input type="file" multiple onChange={handleImageUpload} />
                <button type="submit">Submit Listing</button>
            </form>
        </div>
    );
};

export default PGListing;