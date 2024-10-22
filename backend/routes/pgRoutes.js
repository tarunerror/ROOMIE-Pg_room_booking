import express from 'express';
import PG from '../models/PG.js';
import Review from '../models/Review.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all PGs
router.get('/', async (req, res) => {
  try {
    const pgs = await PG.find().populate('owner', 'name');
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PGs' });
  }
});

// Add a new PG
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { name, address, price, amenities, description, capacity, gender } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    const newPG = new PG({
      name,
      address,
      price: Number(price),
      amenities: amenities.split(','),
      images,
      owner: req.userId,
      description,
      capacity: Number(capacity),
      gender
    });
    await newPG.save();
    res.status(201).json(newPG);
  } catch (error) {
    res.status(500).json({ message: 'Error adding PG' });
  }
});

// Search PGs
router.get('/search', async (req, res) => {
  try {
    const { query, gender, minPrice, maxPrice } = req.query;
    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { amenities: { $in: [new RegExp(query, 'i')] } }
      ]
    };

    if (gender && gender !== 'any') {
      filter.gender = gender;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pgs = await PG.find(filter).populate('owner', 'name');
    res.json(pgs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching PGs' });
  }
});

// Add a review
router.post('/:pgId/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const pg = await PG.findById(req.params.pgId);
    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }

    const review = new Review({
      user: req.userId,
      pg: pg._id,
      rating: Number(rating),
      comment
    });

    await review.save();
    pg.reviews.push(review._id);
    pg.rating = (pg.rating * pg.reviews.length + review.rating) / (pg.reviews.length + 1);
    await pg.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
});

export default router;