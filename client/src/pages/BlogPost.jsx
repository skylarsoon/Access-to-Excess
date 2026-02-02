import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/blogs');
                const data = await response.json();

                if (data.records && data.records.length > 0) {
                    // Find the post matching the slug
                    const foundPost = data.records.find(p => p.Slug === slug || p.id === slug);
                    setPost(foundPost || null);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const images = post?.Images || [];
    const hasMultipleImages = images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center px-6">
                    <div className="w-12 h-12 border-4 border-pro-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center px-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <ArrowLeft size={32} className="text-gray-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">Post Not Found</h1>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">The blog post you're looking for doesn't exist or may have been moved.</p>
                    <button
                        onClick={() => navigate('/about')}
                        className="px-8 py-3.5 bg-pro-green text-white rounded-lg hover:bg-pro-dark transition-all shadow-md hover:shadow-lg font-medium"
                    >
                        Back to Updates
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in bg-white min-h-screen">
            {/* Hero Section - Taller with better proportions */}
            <section className="relative h-[55vh] min-h-[450px] max-h-[600px] flex items-end -mt-20">
                <div className="absolute inset-0">
                    <img
                        src={images[0]?.url || '/placeholder-image.jpg'}
                        alt={post.Title || 'Blog post image'}
                        className="w-full h-full object-cover"
                    />
                    {/* Multi-layer gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 pb-14 pt-20">
                    <button
                        onClick={() => navigate('/about')}
                        className="group flex items-center gap-2.5 text-white/80 hover:text-white mb-8 transition-all"
                    >
                        <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <ArrowLeft size={16} />
                        </span>
                        <span className="text-sm font-medium">Back to Updates</span>
                    </button>

                    {/* Date Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium tracking-wide uppercase">
                            {post.Date}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-3xl">
                        {post.Title}
                    </h1>
                </div>
            </section>

            {/* Content Container - Wider with better structure */}
            <div className="relative">
                {/* Decorative top edge */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pro-light-green/30 to-transparent"></div>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20">
                    {/* Article Summary/Lead (first paragraph emphasis) */}
                    <div className="mb-10 pb-10 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-pro-light-green/20 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-pro-green"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Community Update</span>
                        </div>
                    </div>

                    {/* Main Content with enhanced typography */}
                    <div
                        className="prose prose-lg md:prose-xl prose-green max-w-none
                            prose-headings:text-[#166534] prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:relative
                            prose-h2:pl-0 prose-h2:before:hidden
                            prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[17px] prose-p:md:text-lg
                            prose-ul:my-6 prose-ul:pl-0 prose-ul:list-none
                            prose-li:text-gray-600 prose-li:mb-3 prose-li:pl-7 prose-li:relative
                            prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 
                            prose-li:before:top-[10px] prose-li:before:w-2 prose-li:before:h-2 
                            prose-li:before:bg-pro-light-green prose-li:before:rounded-full
                            prose-a:text-pro-green prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                            prose-strong:text-gray-800"
                        dangerouslySetInnerHTML={{ __html: post.Content }}
                    />

                    {/* Image Gallery Slideshow - Only show if multiple images */}
                    {hasMultipleImages && (
                        <div className="mt-12 pt-10 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-[#166534] mb-6">Photo Gallery</h2>
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                                <div className="aspect-video">
                                    <img
                                        src={images[currentImageIndex]?.url}
                                        alt={`${post.Title} - Image ${currentImageIndex + 1}`}
                                        className="w-full h-full object-contain transition-opacity duration-300"
                                    />
                                </div>

                                {/* Previous Button */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} className="text-white" />
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} className="text-white" />
                                </button>

                                {/* Image Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                                    <span className="text-white text-sm font-medium">
                                        {currentImageIndex + 1} / {images.length}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Navigation */}
                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${
                                            index === currentImageIndex
                                                ? 'ring-2 ring-pro-green ring-offset-2'
                                                : 'opacity-60 hover:opacity-100'
                                        }`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Section with enhanced styling */}
                    <div className="mt-16 pt-10 border-t border-gray-100">
                        {/* Share/Action row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Published on</p>
                                <p className="text-gray-700 font-medium">{post.Date}</p>
                            </div>

                            <button
                                onClick={() => navigate('/about')}
                                className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-50 hover:bg-pro-light-green/20 
                                    rounded-lg transition-all text-pro-green border border-gray-100 hover:border-pro-light-green/50"
                            >
                                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                                <span className="font-semibold">All Updates</span>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default BlogPost;
