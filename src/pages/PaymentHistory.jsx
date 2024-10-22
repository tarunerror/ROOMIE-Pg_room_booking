import React, { useEffect, useState } from 'react';
import { getPaymentHistory } from '../api/api';
import './PaymentHistory.css';

const PaymentHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                setLoading(true);
                const userId = localStorage.getItem('userId');
                const response = await getPaymentHistory(userId);
                setBookings(response.data);
            } catch (error) {
                setError('Error fetching payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="payment-history">
            <h2>Payment History</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <p>PG: {booking.pg.name}</p>
                            <p>Amount: ₹{booking.totalAmount}</p>
                            <p>Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                            <p>Status: {booking.paymentStatus}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentHistory;