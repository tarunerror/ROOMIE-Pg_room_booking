# Roomie - PG Booking Application

Roomie is a full-stack web application for booking Paying Guest (PG) accommodations. It allows users to search for PGs, view details, make bookings, and for PG owners to list their properties.

## 🌟 Features

- User authentication (signup, login)
- Search PGs by name, landmark, or amenities
- Advanced filtering options (gender, price range)
- View PG details including amenities, prices, and images
- Book PG rooms with integrated Paytm payment gateway
- PG owners can list their properties
- View booking and payment history
- Add and view reviews for PGs
- Responsive design for mobile and desktop

## 🛠 Tech Stack

- Frontend: React with Vite
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Payment Integration: Paytm
- Styling: Custom CSS with animations

## 📋 Prerequisites

- Node.js (v14 or later)
- MongoDB
- Paytm Business Account for payment integration

## 🚀 Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/roomie.git
   cd roomie
   ```

2. Install dependencies for frontend and backend:
   ```
   npm install
   cd backend && npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/roomie
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   PAYTM_MID=your_paytm_merchant_id
   PAYTM_MERCHANT_KEY=your_paytm_merchant_key
   PAYTM_WEBSITE=WEBSTAGING
   PAYTM_CLIENT_ID=your_paytm_client_id
   PAYTM_CALLBACK_URL=http://localhost:5000/api/payment/paytm-callback
   FRONTEND_URL=http://localhost:5173
   ```

## 🏃‍♂️ Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## 📚 API Endpoints

- POST /api/auth/signup - User signup
- POST /api/auth/login - User login
- GET /api/pg - Get all PGs
- POST /api/pg - Add a new PG
- GET /api/pg/search - Search PGs
- POST /api/pg/:pgId/reviews - Add a review for a PG
- POST /api/payment/paytm - Initiate Paytm payment
- POST /api/payment/paytm-callback - Paytm payment callback
- GET /api/payment/history/:userId - Get payment history for a user

## 🎨 Styling and Animations

The application features a modern and responsive design with smooth animations:

- Fade-in and slide-up animations for page elements
- Hover effects on buttons and cards
- 3D card effect for PG listings
- Custom color scheme and typography

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Paytm Developer](https://developer.paytm.com/)
- [Vite](https://vitejs.dev/)