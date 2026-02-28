import React, { useState, useEffect } from 'react';

export default function FoodPickupTable({ endpoint, title }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch( '/api/' + endpoint);

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [endpoint]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading schedules...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading data: {error}</div>;

    return (
        <div className="w-full">
            {title && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                        Lorem ipsum dolor sit amet consectetur. Mauris dolor nisl tempor turpis eget commodo. Eu vitae ullamcorper vel vitae tellus. In dignissim faucibus elementum praesent mi quis enim orci.
                    </p>
                </div>
            )}

            <div className="space-y-6">
                {data?.records?.map((record, index) => {
                    const startTime = new Date(record.fields.StartTime);
                    const endTime = new Date(record.fields.EndTime);

                    // Format date: "Monday (Dec 23, 2025)"
                    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
                    const dateString = startTime.toLocaleDateString('en-US', dateOptions).replace(',', ' (').replace(/(\d{4})/, '$1)');

                    // Format time: "12 pm - 3 pm"
                    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
                    const startString = startTime.toLocaleTimeString('en-US', timeOptions).toLowerCase();
                    const endString = endTime.toLocaleTimeString('en-US', timeOptions).toLowerCase();

                    return (
                        <div
                            key={index}
                            className="w-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-black mb-1">{record.fields.Location}</h3>
                                <p className="text-xs text-gray-500">{record.fields.Address}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs text-black mb-4">
                                    {dateString}: {startString} - {endString}
                                </p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {record.fields.Notes}
                                </p>
                            </div>

                            <button className="px-4 py-2 bg-gray-200 text-black text-xs font-bold rounded hover:bg-gray-300 transition-colors">
                                Map & Directions
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}