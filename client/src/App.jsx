import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Volunteer from './pages/Volunteer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FoodPickup from './pages/FoodPickup';
import FoodDistributions from './pages/FoodDistributions';
import MailingListSignup from './pages/MailingListSignup';
import Donate from './pages/DonationForm';
import Success from './pages/Success';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
                <Header />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/volunteer" element={<Volunteer />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/food-pickup" element={<FoodPickup />} />
                        <Route path="/food-distributions" element={<FoodDistributions />} />
                        <Route path="/mailing-list-signup" element={<MailingListSignup />} />
                        <Route path="/donate" element={<Donate />} />
                        <Route path="/success" element={<Success />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
