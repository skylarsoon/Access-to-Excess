import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Volunteer from './pages/Volunteer';
import Blog from './pages/Blog';
import FoodPickup from './pages/FoodPickup';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/volunteer" element={<Volunteer />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/food-pickup" element={<FoodPickup />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
