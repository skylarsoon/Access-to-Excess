import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/FoodPickupTable.jsx';

function FoodPickup() {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Section */}
            <header
                className="relative px-4 md:px-8 py-20 md:py-32 overflow-hidden"
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
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-8 leading-tight">
                            Get access to the<br />
                            food you need
                        </h1>
                        <button
                            onClick={() => navigate('/mailing-list-signup')}
                            className="px-6 py-3 bg-gray-200 text-black text-sm font-bold uppercase tracking-wide rounded-md hover:bg-gray-300 transition-all shadow-sm"
                        >
                            Sign Up for Text Alerts
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <div className="px-4 md:px-8 py-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <Table
                        endpoint="food-pickup"
                        title="Upcoming Food Stands in Dayton, Ohio"
                    />
                </div>
            </div>
        </div>
    );
}

export default FoodPickup;