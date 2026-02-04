import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHome = location.pathname === '/';
    const isVolunteer = location.pathname === '/volunteer';
    const isAbout = location.pathname === '/about';
    const isDonate = location.pathname === '/donate';
    const isOverlayPage = isHome || isVolunteer || isAbout || isDonate;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Scroll listener for sticky navbar behavior
    useEffect(() => {
        const handleScroll = () => {
            // Consider "scrolled past hero" when we've gone past 100px
            const scrollThreshold = 100;
            setIsScrolled(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Dynamic navbar classes based on route and scroll position
    const getNavClasses = () => {
        if (isOverlayPage) {
            if (isScrolled) {
                // Scrolled: sticky white navbar
                return 'fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300';
            } else {
                // Not scrolled: transparent overlay
                return 'fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300';
            }
        } else {
            // Non-overlay pages (Food Distributions, etc.): always white sticky
            return 'fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100';
        }
    };

    // Nav link styles based on current state
    const getLinkClasses = () => {
        if (isOverlayPage && !isScrolled) {
            return 'text-white hover:opacity-80 font-medium text-[15px] transition-opacity';
        }
        return 'text-black hover:text-pro-green font-medium text-[15px] transition-colors';
    };

    // Logo and text color based on state
    const getLogoInvert = () => {
        if (isOverlayPage && !isScrolled) {
            return ''; // White logo on transparent
        }
        return 'invert'; // Dark logo on white bg
    };

    const getTextColor = () => {
        if (isOverlayPage && !isScrolled) {
            return 'text-white';
        }
        return 'text-black';
    };

    const getMobileButtonColor = () => {
        if (isOverlayPage && !isScrolled) {
            return 'text-white';
        }
        return 'text-black';
    };

    return (
        <>
            {/* Spacer for fixed navbar - only for non-overlay pages or always to prevent content jump */}
            <div className="h-20"></div>

            <nav className={getNavClasses()}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        {/* Logo with circular badge */}
                        <img
                            src="/logo-white.png"
                            alt="Access to Excess Logo"
                            className={`w-20 h-20 object-contain ${getLogoInvert()}`}
                        />
                        <div className="flex flex-col leading-tight">
                            <span className={`text-sm font-bold tracking-widest ${getTextColor()}`}>
                                ACCESS
                            </span>
                            <span className={`text-sm font-medium tracking-widest ${getTextColor()}`}>
                                TO EXCESS
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/about" className={getLinkClasses()}>About Us</Link>
                        <Link to="/donate" className={getLinkClasses()}>Donate</Link>
                        <Link to="/volunteer" className={getLinkClasses()}>Volunteer</Link>
                        {/* Find Food - GREEN solid button */}
                        <Link
                            to="/food-distributions"
                            className="px-5 py-2 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md transition-all"
                        >
                            Find Food
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 focus:outline-none ${getMobileButtonColor()}`}
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden flex flex-col p-6 space-y-4 z-50">
                        <Link
                            to="/about"
                            className="text-lg font-medium text-gray-900 py-2 border-b border-gray-100"
                            onClick={toggleMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/donate"
                            className="text-lg font-medium text-gray-900 py-2 border-b border-gray-100"
                            onClick={toggleMenu}
                        >
                            Donate
                        </Link>
                        <Link
                            to="/volunteer"
                            className="text-lg font-medium text-gray-900 py-2 border-b border-gray-100"
                            onClick={toggleMenu}
                        >
                            Volunteer
                        </Link>
                        {/* Find Food - GREEN button on mobile too */}
                        <Link
                            to="/food-distributions"
                            className="w-full text-center py-3 bg-pro-green hover:bg-pro-dark text-white text-lg font-bold rounded-md transition-all"
                            onClick={toggleMenu}
                        >
                            Find Food
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Header;
