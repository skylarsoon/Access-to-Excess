import React from 'react';

function Header({ currentPage, navigateTo }) {
    return (
        <nav className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-6xl mx-auto">
            <div
                className="text-xl font-bold tracking-tight text-emerald-900 cursor-pointer"
                onClick={() => navigateTo('home')}
            >
                Access to Excess
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
                <button onClick={() => navigateTo('home')} className={`hover:text-emerald-700 transition-colors ${currentPage === 'home' ? 'text-emerald-800 font-semibold' : ''}`}>Home</button>
                <button onClick={() => navigateTo('about')} className={`hover:text-emerald-700 transition-colors ${currentPage === 'about' ? 'text-emerald-800 font-semibold' : ''}`}>About</button>
                <button onClick={() => navigateTo('blog')} className={`hover:text-emerald-700 transition-colors ${currentPage === 'blog' ? 'text-emerald-800 font-semibold' : ''}`}>Blog</button>
                <button onClick={() => navigateTo('volunteer')} className={`hover:text-emerald-700 transition-colors ${currentPage === 'volunteer' ? 'text-emerald-800 font-semibold' : ''}`}>Volunteer</button>
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
