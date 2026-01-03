import React, { useState } from 'react';
import { Truck, Users, ShoppingBag, Package, ChevronDown, ChevronUp } from 'lucide-react';

function Volunteer() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToForm = () => {
        const formSection = document.getElementById('volunteer-form');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const faqs = [
        {
            question: "How much time do I need to commit as a volunteer?",
            answer: "We have flexible shifts ranging from 1-4 hours. You can volunteer as little or as often as you like!"
        },
        {
            question: "Do I need any special skills or training?",
            answer: "No special skills are required for most roles. We provide on-site training for all new volunteers."
        },
        {
            question: "Can I volunteer as part of a group?",
            answer: "Absolutely! We welcome corporate groups, school clubs, and families. Please contact us in advance to schedule a group shift."
        },
        {
            question: "What should I wear when volunteering?",
            answer: "Please wear closed-toe shoes and comfortable clothing that you don't mind getting a little dirty."
        },
        {
            question: "Is there a minimum age requirement?",
            answer: "Volunteers must be at least 14 years old. Those under 16 must be accompanied by an adult."
        },
        {
            question: "How do I sign up for a specific shift?",
            answer: "Once you submit your application, you'll receive a link to our scheduling portal where you can view and sign up for available shifts."
        }
    ];

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section */}
            <section className="px-4 md:px-8 py-20 md:py-32 text-center bg-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        Volunteer with Access to Excess<br />in Dayton, Ohio
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join our mission to rescue surplus food and redistribute it to those in need. Every volunteer makes a difference in fighting food waste and hunger in our community.
                    </p>
                    <button
                        onClick={scrollToForm}
                        className="px-8 py-3 bg-gray-200 text-black text-sm font-bold uppercase tracking-wide rounded-md hover:bg-gray-300 transition-all shadow-sm"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Roles Section */}
            <section className="px-4 md:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-black mb-12">What You'll Help With</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="p-8 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Truck size={24} className="text-black" />
                            </div>
                            <h3 className="text-sm font-bold text-black mb-3">Food Pickups</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Transport rescued food from donors to distribution sites
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="p-8 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users size={24} className="text-black" />
                            </div>
                            <h3 className="text-sm font-bold text-black mb-3">Distribution Events</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Help distribute food directly to community members
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="p-8 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={24} className="text-black" />
                            </div>
                            <h3 className="text-sm font-bold text-black mb-3">Market Support</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Assist with organizing and running community markets
                            </p>
                        </div>
                        {/* Card 4 */}
                        <div className="p-8 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package size={24} className="text-black" />
                            </div>
                            <h3 className="text-sm font-bold text-black mb-3">Cleanup & Logistics</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Support warehouse sorting, packing, and facility maintenance
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="px-4 md:px-8 py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Volunteers in Action</h2>
                    <p className="text-sm text-gray-500 mb-12">See our community making a difference</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" alt="Volunteers working" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" alt="Food distribution" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" alt="Fresh produce" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Signup & FAQ Section */}
            <section id="volunteer-form" className="px-4 md:px-8 py-20 bg-white">
                <div className="max-w-2xl mx-auto">
                    {/* Form */}
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-20">
                        <h2 className="text-xl font-bold text-center text-black mb-2">Sign Up to Volunteer</h2>
                        <p className="text-xs text-center text-gray-500 mb-8">Fill out the form below and we'll be in touch with next steps</p>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors" required />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Preferred Contact Method *</label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors" required />
                            </div>

                            <div>
                                <label
                                    htmlFor="availability"
                                    className="block text-xs font-medium text-gray-700 mb-2"
                                >
                                    General Availability
                                </label>
                                <select
                                    id="availability"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors"
                                >
                                    <option value="">Select your availability...</option>
                                    <option value="weekdays">Weekdays (Mon–Fri)</option>
                                    <option value="weekends">Weekends (Sat–Sun)</option>
                                    <option value="mornings">Mornings</option>
                                    <option value="afternoons">Afternoons</option>
                                    <option value="flexible">Flexible / Varies</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full py-3 bg-[#0f172a] text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors mt-4">
                                Submit Application
                            </button>
                        </form>
                    </div>

                    {/* FAQ */}
                    <div className="text-center mb-10">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Frequently Asked Questions</h3>
                        <p className="text-xs text-gray-400">Have questions about volunteering? We've got answers.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
                                >
                                    <span className="text-sm font-medium text-gray-800">{faq.question}</span>
                                    {openFaq === index ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Volunteer;
