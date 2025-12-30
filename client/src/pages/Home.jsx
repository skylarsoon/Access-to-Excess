import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <header className="px-4 md:px-8 py-20 md:py-32 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
                    Recovering surplus food.<br />
                    Sharing it freely.
                </h1>
                <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Access to Excess is a Dayton food rescue operation that recovers and redistributes wholesome vegetables and other surplus foods.
                </p>
                <button
                    onClick={() => navigate('/volunteer')}
                    className="px-8 py-4 bg-emerald-700 text-white text-lg font-medium rounded-full hover:bg-emerald-800 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                    Get Involved
                </button>
            </header>

            {/* About / What We Do */}
            <section className="px-4 md:px-8 py-16 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3">Our Mission</h2>
                    <p className="text-2xl md:text-3xl font-medium text-stone-800 leading-relaxed">
                        We bridge the gap between abundance and need. By rescuing food that would otherwise go to waste, we create a more sustainable and equitable food system for Dayton, Ohio.
                    </p>
                </div>
            </section>

            {/* Pickups */}
            <section className="px-4 md:px-8 py-20 bg-stone-100">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        {/* Abstract visual representation for pickups */}
                        <div className="bg-emerald-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                            <div className="text-emerald-800 opacity-20 text-9xl font-serif">
                                &darr;
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h3 className="text-3xl font-bold text-stone-900 mb-6">Pickups</h3>
                        <p className="text-lg text-stone-600 leading-relaxed mb-6">
                            We collect surplus produce and other wholesome goods from home gardeners, farms, grocery stores, and Dayton-area nonprofits and pantries.
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            Donations are unpredictable and occur throughout the day, ensuring that fresh food is constantly moving from where it is excess to where it is accessed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Distributions */}
            <section className="px-4 md:px-8 py-20 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-stone-900 mb-6">Distributions</h3>
                        <p className="text-lg text-stone-600 leading-relaxed mb-6">
                            Distributions are free, unregulated, and open to everyone. We believe in removing barriers to access.
                        </p>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            People are encouraged to take what they want, try new foods, and share with others. It's not just about feeding people; it's about building community through food.
                        </p>
                    </div>
                    <div>
                        {/* Abstract visual representation for distributions */}
                        <div className="bg-orange-50 rounded-2xl p-8 h-64 flex items-center justify-center">
                            <div className="text-orange-800 opacity-20 text-9xl font-serif">
                                &rarr;
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community & Affiliation */}
            <section className="px-4 md:px-8 py-24 bg-emerald-900 text-emerald-50 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Community & Affiliation</h2>
                    <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
                        We are proud to be part of a larger movement towards food justice and sustainability.
                    </p>
                    <div className="inline-flex items-center justify-center px-8 py-4 border border-emerald-700 bg-emerald-800 rounded-lg">
                        <span className="font-semibold tracking-wide">Proud member of the Food Rescue Alliance</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
