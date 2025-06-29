
// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import BigSlide from './components/BigSlide';
import Steps from './components/Steps';
import ImageUploader from './components/ImageUploader';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BigSlide />
                  <Steps />
                  <PrivateRoute>
                    <ImageUploader />
                  </PrivateRoute>
                  <Testimonial />
                </>
              }
            />
            {/* Optional Auth Routes */}
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
