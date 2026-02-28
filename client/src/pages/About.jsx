import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogPostModal from '../components/BlogPostModal';

function About() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [updates, setUpdates] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch blog posts from Airtable
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch( '/api/blogs');
                const data = await response.json();

                if (data.records && data.records.length > 0) {
                    setUpdates(data.records);

                    // Check if there's a post query param to open on load
                    const postId = searchParams.get('post');
                    if (postId) {
                        const postToOpen = data.records.find(p => p.id === postId || p.Slug === postId);
                        if (postToOpen) {
                            setSelectedPost(postToOpen);
                            setIsModalOpen(true);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchParams]);

    // Open modal with selected post
    const openPost = useCallback((post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
        // Update URL with query param for optional deep linking
        setSearchParams({ post: post.Slug || post.id }, { replace: true });
    }, [setSearchParams]);

    // Close modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        // Remove the post query param
        setSearchParams({}, { replace: true });
        // Small delay before clearing selected post to allow exit animation
        setTimeout(() => setSelectedPost(null), 200);
    }, [setSearchParams]);

    const scrollToUpdates = () => {
        document.getElementById('updates-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section - Full width background with overlay - SAME HEIGHT AS HOME */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-start overflow-hidden -mt-20">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/about-hero.jpg"
                        alt="Fresh produce at Access to Excess"
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
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15]">
                            <span className="text-pro-light-green">5k pounds</span><br />of excess food<br />
                            saved this week.
                        </h1>
                        <div className="flex flex-row gap-4 mt-8">
                            <button
                                onClick={scrollToUpdates}
                                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
                            >
                                See Recent Updates
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog-Style Updates Section */}
            <section id="updates-section" className="px-4 md:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {updates.map((update) => (
                        <div
                            key={update.id}
                            className="group cursor-pointer"
                            onClick={() => openPost(update)}
                        >
                            {/* Card Image */}
                            <div className="w-full aspect-video rounded-2xl mb-6 transition-transform transform group-hover:scale-[1.01] duration-300">
                                <img
                                    src={update.Images?.[0]?.url}
                                    alt={update.Title || 'Update image'}
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="space-y-3">
                                <div className="text-sm font-medium text-emerald-700 uppercase tracking-wide">{update.Date}</div>
                                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">{update.Title}</h3>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    {update.Excerpt || update.Content?.substring(0, 150) + '...'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blog Post Modal */}
            <BlogPostModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}

export default About;
