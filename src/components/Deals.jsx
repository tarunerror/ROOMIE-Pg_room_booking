import React from 'react';
import './Deals.css';

const Deals = () => {
    return (
        <div className="deals">
            <h2>Featured PG Rooms</h2>
            <div className="deal-items">
                <div className="deal-item">
                    <img src="/images/pg-room-1.jpg" alt="Cozy Single Room" />
                    <h3>Cozy Single Room</h3>
                    <p>Fully furnished with attached bathroom</p>
                    <span className="price">₹8,000/month</span>
                </div>
                <div className="deal-item">
                    <img src="/images/pg-room-2.jpg" alt="Spacious Double Room" />
                    <h3>Spacious Double Room</h3>
                    <p>Perfect for friends, includes study area</p>
                    <span className="price">₹12,000/month</span>
                </div>
                <div className="deal-item">
                    <img src="/images/pg-room-3.jpg" alt="Deluxe Room with Balcony" />
                    <h3>Deluxe Room with Balcony</h3>
                    <p>Enjoy city views, AC included</p>
                    <span className="price">₹15,000/month</span>
                </div>
            </div>
        </div>
    );
};

export default Deals;