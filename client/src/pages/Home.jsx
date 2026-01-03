import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section with Diagonal Pattern */}
            <header
                className="relative px-4 md:px-8 py-24 md:py-32 overflow-hidden"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        #ffffff,
                        #ffffff 2px,
                        #f3f4f6 2px,
                        #f3f4f6 4px
                    )`
                }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-black mb-8 leading-tight">
                            Saving excess food<br />
                            & Increasing access to it.
                        </h1>
                        <button
                            onClick={() => navigate('/volunteer')}
                            className="px-8 py-3 bg-gray-200 text-black text-sm font-bold uppercase tracking-wide rounded-md hover:bg-gray-300 transition-all shadow-sm"
                        >
                            I'd like to get involved
                        </button>
                    </div>
                </div>
            </header>

            {/* About Section */}
            <section className="px-4 md:px-8 py-24 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg group">
                        <img
                            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800"
                            alt="Community food distribution"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="text-left">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">ABOUT US</h2>
                        <h3 className="text-2xl md:text-4xl font-bold text-black mb-8 leading-tight">
                            Reducing Food Waste.<br />
                            Providing Access to Food for All.
                        </h3>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            We bridge the gap between abundance and need. By rescuing food that would otherwise go to waste, we create a more sustainable and equitable food system for Dayton, Ohio.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our mission is simple: feed people, not landfills. We partner with local farms, markets, and businesses to recover wholesome surplus food and distribute it freely to our community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 md:px-8 py-24 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                        <div className="text-5xl md:text-6xl font-bold text-black mb-4 group-hover:scale-105 transition-transform">180k+</div>
                        <div className="text-xl font-semibold text-gray-800 mb-3">Pounds</div>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">of food rescued and redistributed in 2023.</p>
                    </div>
                    <div className="p-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                        <div className="text-5xl md:text-6xl font-bold text-black mb-4 group-hover:scale-105 transition-transform">130</div>
                        <div className="text-xl font-semibold text-gray-800 mb-3">Families</div>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">received 40 pounds of food in 2023.</p>
                    </div>
                    <div className="p-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                        <div className="text-5xl md:text-6xl font-bold text-black mb-4 group-hover:scale-105 transition-transform">500k+</div>
                        <div className="text-xl font-semibold text-gray-800 mb-3">Pounds</div>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">of food rescued and redistributed since our founding in 2019.</p>
                    </div>
                </div>
            </section>

            {/* Growth & Progress */}
            <section className="px-4 md:px-8 py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-black mb-12 text-center">Growth & Progress</h2>
                    <div className="space-y-8">
                        <div className="flex items-start bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-black mt-2 mr-6"></div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">Expanded Pickup Network</h3>
                                <p className="text-gray-600 leading-relaxed">Partnered with 5 new local farms and 3 grocery chains to increase food recovery volume.</p>
                            </div>
                        </div>
                        <div className="flex items-start bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-black mt-2 mr-6"></div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">New Distribution Hub</h3>
                                <p className="text-gray-600 leading-relaxed">Opened a central sorting facility to handle larger donations and improve distribution efficiency.</p>
                            </div>
                        </div>
                        <div className="flex items-start bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-black mt-2 mr-6"></div>
                            <div>
                                <h3 className="text-xl font-bold text-black mb-2">Community Education</h3>
                                <p className="text-gray-600 leading-relaxed">Launched workshops on food preservation and sustainable cooking for community members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="px-4 md:px-8 py-24 bg-white text-center">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-black mb-16">What Can We Do About Food Waste?</h2>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Ob6JphJh6mI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
