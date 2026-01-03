import React from 'react';

function Blog() {
    const posts = [
        {
            id: 1,
            title: "Community Produce Stand Success",
            date: "October 15, 2023",
            description: "Our latest pop-up market in East Dayton served over 200 families with fresh, locally rescued produce.",
            color: "bg-emerald-100"
        },
        {
            id: 2,
            title: "Volunteer Spotlight: Sarah's Story",
            date: "September 28, 2023",
            description: "Meet Sarah, who has been driving our rescue van every Tuesday for the past three years.",
            color: "bg-orange-100"
        },
        {
            id: 3,
            title: "New Partnership with Green Acres Farm",
            date: "September 10, 2023",
            description: "We are excited to announce a new partnership that will bring an additional 500 lbs of fresh vegetables weekly.",
            color: "bg-blue-100"
        },
        {
            id: 4,
            title: "Fall Food Share Day",
            date: "August 22, 2023",
            description: "Join us for our largest distribution event of the season. Everyone is welcome to take what they need.",
            color: "bg-yellow-100"
        }
    ];

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
                            {/* Placeholder Image */}
                            <div className={`w-full aspect-video ${post.color} rounded-2xl mb-6 transition-transform transform group-hover:scale-[1.01] duration-300`}></div>

                            <div className="space-y-3">
                                <div className="text-sm font-medium text-emerald-700 uppercase tracking-wide">{post.date}</div>
                                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">{post.title}</h3>
                                <p className="text-stone-600 leading-relaxed text-lg">{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Blog;
