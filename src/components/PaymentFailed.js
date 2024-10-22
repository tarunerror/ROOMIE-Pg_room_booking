import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="payment-failed">
      <h2>Payment Failed</h2>
      <p>We're sorry, but your payment could not be processed. Please try again or contact support.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PaymentFailed;