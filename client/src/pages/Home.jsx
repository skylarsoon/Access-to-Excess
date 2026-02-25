import React from 'react';
import { useNavigate } from 'react-router-dom';

// Fruit & Vegetable SVG Icons
const AppleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2c-1.5 0-2.5 1-3 2-2 0-4 1.5-4 4 0 4 3 10 7 12 4-2 7-8 7-12 0-2.5-2-4-4-4-.5-1-1.5-2-3-2z" />
        <path d="M12 2v4" />
        <path d="M10 1c1 0 2 1 2 2" />
    </svg>
);

const CarrotIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 21l8-14" />
        <path d="M16 7c2-2 4-2 5-1s1 3-1 5l-8 8c-2 2-4 2-5 1s-1-3 1-5l8-8z" />
        <path d="M18 4l2 2" />
        <path d="M15 3l1 1" />
        <path d="M20 7l1 1" />
    </svg>
);

const GrapesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="2" />
        <circle cx="9" cy="12" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="12" cy="16" r="2" />
        <circle cx="7" cy="16" r="2" />
        <circle cx="17" cy="16" r="2" />
        <path d="M12 2v4" />
        <path d="M10 3c1 0 2 1 2 1" />
    </svg>
);

const LemonIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="8" ry="6" transform="rotate(45 12 12)" />
        <path d="M14 10c0 1-1 2-2 2s-2-1-2-2" />
    </svg>
);

const LeafIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 21c3-3 8-8 14-8-2 8-7 11-14 8z" />
        <path d="M6 21c-1-4 2-9 6-12" />
    </svg>
);

function Home() {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section - Per Correct Figma Wireframe */}
            <header className="relative h-[80vh] min-h-[600px] flex items-center justify-start overflow-hidden -mt-20">
                {/* Background Image - Colorful produce/farmer's market */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-produce.jpg"
                        alt="Fresh produce at farmer's market"
                        className="w-full h-full object-cover"
                    />
                    {/* Linear Gradient Overlay - Left to Right (dark on left, fades right) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)'
                        }}
                    ></div>
                    {/* Additional dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20">
                    <div className="max-w-xl">
                        {/* Text with GREEN highlights on "excess" and "access" per Figma */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15]">
                            Saving <span className="text-pro-light-green">Excess</span> food<br />
                            & Increasing <span className="text-pro-light-green">Access</span> to it.
                        </h1>

                        {/* SOLID GREEN BUTTONS per Figma - NOT underlined text */}
                        <div className="flex flex-row gap-4 mt-8">
                            <button
                                onClick={() => navigate('/volunteer')}
                                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
                            >
                                Get Involved
                            </button>
                            <button
                                onClick={() => navigate('/food-distributions')}
                                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
                            >
                                Find Food
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* About Section - Centered Layout per Reference */}
            <section className="px-4 md:px-8 py-24 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">ABOUT US</h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pro-green mb-8 leading-tight italic">
                        Reducing Food Waste.<br />
                        Providing Access to Food for All.
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        By reducing waste and strengthening community access, we help ensure good food reaches people—not landfills.
                    </p>
                </div>
            </section>

            {/* Stats Section - Clean Design with Green Numbers */}
            <section className="px-4 md:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="py-8">
                        <div className="text-4xl md:text-5xl font-bold text-pro-green mb-2">1.5M+ Pounds</div>
                        <p className="text-sm text-gray-600 max-w-[220px] mx-auto leading-relaxed">of food rescued and redistributed since our founding in 2019.</p>
                    </div>
                    <div className="py-8">
                        <div className="text-4xl md:text-5xl font-bold text-pro-green mb-2">130 Families</div>
                        <p className="text-sm text-gray-600 max-w-[220px] mx-auto leading-relaxed">received 40 pounds of food in 2023.</p>
                    </div>
                    {/* <div className="py-8">
                        <div className="text-4xl md:text-5xl font-bold text-pro-green mb-2">180k+ Pounds</div>
                        <p className="text-sm text-gray-600 max-w-[220px] mx-auto leading-relaxed">of food rescued and redistributed in 2023.</p>
                    </div> */}
                </div>
            </section>

            {/* Video Section - Dark Green Background with Fruit Icons */}
            <section className="relative px-4 md:px-8 py-24 bg-pro-dark text-center overflow-hidden">
                {/* Decorative Fruit Icons - Left Side */}
                <div className="absolute left-4 md:left-8 top-1/4 opacity-30 hidden md:block">
                    <AppleIcon className="w-12 h-12 text-pro-light-green mb-4" />
                    <CarrotIcon className="w-10 h-10 text-pro-light-green mb-4 ml-4" />
                    <GrapesIcon className="w-8 h-8 text-pro-light-green" />
                </div>

                {/* Decorative Fruit Icons - Right Side */}
                <div className="absolute right-4 md:right-8 bottom-1/4 opacity-30 hidden md:block">
                    <LemonIcon className="w-10 h-10 text-pro-light-green mb-4" />
                    <LeafIcon className="w-8 h-8 text-pro-light-green ml-6" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Styled Heading with Green Pill Background */}
                    <div className="inline-block mb-12">
                        <h2 className="text-xl md:text-2xl font-bold text-white px-8 py-3 bg-pro-green rounded-full">
                            What Can We Do About Food Waste?
                        </h2>
                    </div>
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

            {/* Get Involved Section - 3 Card Layout */}
            <section className="px-4 md:px-8 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-pro-green text-center mb-16">
                        Want to get involved?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 - Donate */}
                        <div
                            className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden group cursor-pointer"
                            onClick={() => navigate('/donate')}
                        >
                            <img
                                src="/banner1.png"
                                alt="Volunteers at farmers market"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="text-white text-xl font-semibold">Donate</span>
                            </div>
                        </div>

                        {/* Card 2 - Donate */}
                        <div
                            className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden group cursor-pointer"
                            onClick={() => navigate('/volunteer')}
                        >
                            <img
                                src="/banner3.jpg"
                                alt="Community food distribution"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="text-white text-xl font-semibold">Volunteer</span>
                            </div>
                        </div>

                        {/* Card 3 - Learn More */}
                        <div
                            className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden group cursor-pointer"
                            onClick={() => navigate('/about')}
                        >
                            <img
                                src="/banner2.png"
                                alt="Fresh produce and vegetables"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="text-white text-xl font-semibold">Learn More</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
