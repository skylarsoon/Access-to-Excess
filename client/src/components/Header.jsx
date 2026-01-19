import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentPage = location.pathname;

    const isActive = (path) => {
        return currentPage === path
            ? 'text-black font-semibold'
            : 'text-gray-600 hover:text-black';
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="w-full bg-white border-b border-gray-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors"></div>
                    <span className="text-xl font-bold text-black tracking-tight">
                        Access to Excess
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/blog"
                        className={`text-sm font-medium transition-colors ${isActive('/blog')}`}
                    >
                        About Us
                    </Link>



                    <Link
                        to="/donate"
                        className={`text-sm font-medium transition-colors ${isActive('/donate')}`}
                    >
                        Donate
                    </Link>

                    <Link
                        to="/volunteer"
                        className={`text-sm font-medium transition-colors ${isActive('/volunteer')}`}
                    >
                        Volunteer
                    </Link>

                    <Link
                        to="/food-pickup"
                        className="px-6 py-2.5 bg-gray-200 text-black text-sm font-semibold rounded-md hover:bg-gray-300 transition-all"
                    >
                        Get Food
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden flex flex-col p-4 space-y-4 animate-fade-in">
                    <Link
                        to="/blog"
                        className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
                        onClick={toggleMenu}
                    >
                        About Us
                    </Link>



                    <a
                        href="https://buy.stripe.com/test_bJe3cx2wpeEs60QeoI08g00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
                    >
                        Donate
                    </a>

                    <Link
                        to="/volunteer"
                        className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
                        onClick={toggleMenu}
                    >
                        Volunteer
                    </Link>

                    <Link
                        to="/food-pickup"
                        className="w-full text-center px-6 py-3 bg-gray-200 text-black text-base font-semibold rounded-md hover:bg-gray-300 transition-all mt-2"
                        onClick={toggleMenu}
                    >
                        Get Food
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Header;

