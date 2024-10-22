import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import PGList from "./components/PGList";
import PGDetails from "./components/PGDetails";
import AddPG from "./components/AddPG";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pgs" element={<PGList />} />
            <Route path="/pg/:id" element={<PGDetails />} />
            <Route path="/add-pg" element={<AddPG />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;