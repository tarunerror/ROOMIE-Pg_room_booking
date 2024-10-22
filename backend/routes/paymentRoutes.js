import express from 'express';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth.js';
import { paytmConfig } from '../config/paytm.js';
import PaytmChecksum from 'paytmchecksum';
import axios from 'axios';

const router = express.Router();

// Initiate Paytm payment
router.post('/paytm', auth, async (req, res) => {
  try {
    const { pgId, startDate, endDate, totalAmount } = req.body;
    const orderId = 'ORDER_' + new Date().getTime();

    const paytmParams = {
      MID: paytmConfig.mid,
      WEBSITE: paytmConfig.website,
      INDUSTRY_TYPE_ID: 'Retail',
      CHANNEL_ID: 'WEB',
      ORDER_ID: orderId,
      CUST_ID: req.userId,
      TXN_AMOUNT: totalAmount.toString(),
      CALLBACK_URL: paytmConfig.callbackUrl,
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams),
      paytmConfig.mkey
    );

    const newBooking = new Booking({
      user: req.userId,
      pg: pgId,
      startDate,
      endDate,
      totalAmount,
      paymentStatus: 'pending',
      orderId,
    });
    await newBooking.save();

    res.json({
      ...paytmParams,
      CHECKSUMHASH: checksum,
    });
  } catch (error) {
    console.error('Error initiating Paytm payment:', error);
    res.status(500).json({ message: 'Error initiating payment' });
  }
});

// Paytm callback
router.post('/paytm-callback', async (req, res) => {
  try {
    const paytmParams = {};
    for (const key in req.body) {
      if (key === 'CHECKSUMHASH') {
        paytmParams.CHECKSUMHASH = req.body[key];
      } else {
        paytmParams[key] = req.body[key];
      }
    }

    const isValidChecksum = await PaytmChecksum.verifySignature(
      paytmParams,
      paytmConfig.mkey,
      paytmParams.CHECKSUMHASH
    );

    if (isValidChecksum) {
      if (paytmParams.STATUS === 'TXN_SUCCESS') {
        // Payment successful, update booking status
        await Booking.findOneAndUpdate(
          { orderId: paytmParams.ORDERID },
          { paymentStatus: 'completed' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
      } else {
        // Payment failed, update booking status
        await Booking.findOneAndUpdate(
          { orderId: paytmParams.ORDERID },
          { paymentStatus: 'failed' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
      }
    } else {
      res.status(400).json({ message: 'Checksum mismatch' });
    }
  } catch (error) {
    console.error('Error processing Paytm callback:', error);
    res.status(500).json({ message: 'Error processing payment callback' });
  }
});

// Get payment history for a user
router.get('/history/:userId', auth, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const bookings = await Booking.find({ user: req.params.userId }).populate('pg');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment history' });
  }
});

export default router;