import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const currentPage = location.pathname;

    const isActive = (path) => {
        return currentPage === path ? 'text-emerald-800 font-semibold' : '';
    };

    return (
        <nav className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-6xl mx-auto">
            <Link
                to="/"
                className="text-xl font-bold tracking-tight text-emerald-900 cursor-pointer"
            >
                Access to Excess
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
                <Link to="/" className={`hover:text-emerald-700 transition-colors ${isActive('/')}`}>Home</Link>
                <Link to="/about" className={`hover:text-emerald-700 transition-colors ${isActive('/about')}`}>About</Link>
                <Link to="/blog" className={`hover:text-emerald-700 transition-colors ${isActive('/blog')}`}>Blog</Link>
                <Link to="/volunteer" className={`hover:text-emerald-700 transition-colors ${isActive('/volunteer')}`}>Volunteer</Link>
                <Link to="/food-pickup" className={`hover:text-emerald-700 transition-colors ${isActive('/food-pickup')}`}>Food Pickup</Link>
                <a href="https://buy.stripe.com/test_bJe3cx2wpeEs60QeoI08g00" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition-colors">Donate</a>
            </div>
            {/* Mobile menu placeholder */}
            <div className="md:hidden text-stone-600">
                <span className="cursor-pointer">Menu</span>
            </div>
        </nav>
    );
}

export default Header;
