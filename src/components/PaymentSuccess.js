import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Your booking has been confirmed. Thank you for using Roomie!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PaymentSuccess;