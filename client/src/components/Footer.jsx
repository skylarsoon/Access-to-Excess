import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Column 1: Brand */}
                <div className="space-y-4">
                    <h3 className="text-white text-lg font-bold">Access to Excess</h3>
                    <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                        Fighting food waste and hunger in Dayton, Ohio.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/volunteer" className="hover:text-white transition-colors">Volunteer</Link></li>
                        <li><a href="https://buy.stripe.com/test_bJe3cx2wpeEs60QeoI08g00" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Donate</a></li>
                        <li><span className="text-gray-500 cursor-not-allowed">Partner With Us</span></li>
                    </ul>
                </div>

                {/* Column 3: Programs */}
                <div className="space-y-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">Programs</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Food Rescue</span></li>
                        <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Community Markets</span></li>
                        <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Mobile Distribution</span></li>
                        <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Education</span></li>
                    </ul>
                </div>

                {/* Column 4: Connect */}
                <div className="space-y-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">Connect</h4>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Facebook size={18} /> <span>Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Instagram size={18} /> <span>Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Twitter size={18} /> <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail size={18} /> <span>Newsletter</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Access to Excess. All rights reserved.</p>
                <div className="flex gap-6">
                    <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
