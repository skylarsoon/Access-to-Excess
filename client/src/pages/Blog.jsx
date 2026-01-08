import React, { useEffect, useState } from 'react';

function Blog() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/blogs');
                const data = await response.json();

                if (data.records && data.records.length > 0) {
                    setPosts(data.records)
                }
            }
            fetchData();
        } catch(error) {
            console.error('Error fetching data:', error)
        }
    }, [])

    return (
        <div className="animate-fade-in">
            {/* Header / Intro */}
            <header className="px-4 md:px-8 py-16 md:py-24 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
                    Community Updates
                </h1>
                <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                    Stories from the field, updates on our impact, and highlights from our Access to Excess events and outreach.
                </p>
            </header>

            {/* Blog Feed / Post Grid */}
            <section className="px-4 md:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {posts.map(post => (
                        <div key={post.id} className="group cursor-pointer">
                            <div className={`w-full aspect-video rounded-2xl mb-6 transition-transform transform group-hover:scale-[1.01] duration-300`}>
                                <img 
                                    src={post.Images?.[0]?.url} 
                                    alt={post.Title || 'Blog post image'} 
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                            

                            <div className="space-y-3">
                                <div className="text-sm font-medium text-emerald-700 uppercase tracking-wide">{post.Date}</div>
                                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">{post.Title}</h3>
                                <p className="text-stone-600 leading-relaxed text-lg">{post.Content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Blog;
