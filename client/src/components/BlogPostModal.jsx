import React, { useEffect, useRef, useState, useCallback } from 'react';

function BlogPostModal({ post, isOpen, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    const images = post?.Images || [];
    const hasMultipleImages = images.length > 1;

    // Reset image index when post changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [post?.id]);

    // Handle ESC key and focus trap
    useEffect(() => {
        if (!isOpen) return;

        // Store the previously focused element for restoration later
        previousActiveElement.current = document.activeElement;

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }

            // Focus trap - keep focus within modal
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }

            // Arrow keys for image carousel
            if (hasMultipleImages) {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Focus the modal on open
        setTimeout(() => modalRef.current?.focus(), 0);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            previousActiveElement.current?.focus();
        };
    }, [isOpen, onClose, hasMultipleImages]);

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    }, [images.length]);

    // Touch/swipe handling for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !hasMultipleImages) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
    };

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !post) return null;

    // Format content with proper paragraphs
    const formatContent = (content) => {
        if (!content) return null;

        return content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
                {paragraph.split('\n').map((line, lineIndex, arr) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < arr.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        ));
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-modal-backdrop"
            onClick={handleBackdropClick}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Modal Container */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-modal-content"
                style={{
                    animation: 'modalSlideIn 0.3s ease-out'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all shadow-md hover:shadow-lg"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Scrollable Content Area */}
                <div className="overflow-y-auto max-h-[90vh] overscroll-contain">
                    {/* Header Section */}
                    <div className="px-6 md:px-10 pt-8 pb-6">
                        <h2
                            id="modal-title"
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#166534] leading-tight pr-12"
                        >
                            {post.Title}
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm md:text-base">
                            {post.Date}
                        </p>
                    </div>

                    {/* Image Carousel Section */}
                    {images.length > 0 && (
                        <div className="relative px-4 md:px-8">
                            <div
                                className="relative rounded-xl overflow-hidden bg-gray-100"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Images Container - Grid Layout for Multiple Images */}
                                {hasMultipleImages ? (
                                    <div className="relative">
                                        {/* Current Image */}
                                        <div className="aspect-[16/10] md:aspect-[16/9]">
                                            <img
                                                src={images[currentImageIndex]?.url}
                                                alt={`${post.Title} - Image ${currentImageIndex + 1}`}
                                                className="w-full h-full object-cover transition-opacity duration-300"
                                            />
                                        </div>

                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
                                            aria-label="Previous image"
                                        >
                                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
                                            aria-label="Next image"
                                        >
                                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Image Indicator */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-full">
                                            <span className="text-white text-xs font-medium">
                                                {currentImageIndex + 1} / {images.length}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    /* Single Image */
                                    <div className="aspect-[16/10] md:aspect-[16/9]">
                                        <img
                                            src={images[0]?.url}
                                            alt={post.Title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Dot Indicators for Multiple Images */}
                            {hasMultipleImages && (
                                <div className="flex justify-center gap-1.5 mt-4">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                    ? 'bg-[#166534] w-4'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="px-6 md:px-10 py-8">
                        <div className="prose prose-gray prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed text-base md:text-lg">
                                {formatContent(post.Content)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-modal-backdrop {
                    animation: backdropFadeIn 0.2s ease-out;
                }
                
                @keyframes backdropFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default BlogPostModal;
