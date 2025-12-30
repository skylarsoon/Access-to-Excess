import React from 'react';
import { useState, useEffect } from 'react';

export default function FoodPickupTable({ endpoint, title = "Table" }) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Get data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/' + endpoint);

                if (!response.ok){
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
        fetchData()
    }, [endpoint]);

    console.log(data) 

    if (loading) return <div> Loading... </div>;
    if (error) return <div> Error: {error} </div>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">{title}</h1>
            <div className="flex flex-col items-start gap-9 max-w-[1207px]">
                {data?.records?.map((record, index) => (
                    <div
                        key={index}
                        className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-700 mb-1">Location</span>
                                <span className="text-base text-gray-900 font-bold">{record.fields.Location}</span>
                                <span className="text-xs text-gray-900">{record.fields.Address}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-700 mb-1">Start Time</span>
                                <span className="text-base text-gray-900">
                                    {new Date(record.fields.StartTime).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-700 mb-1">End Time</span>
                                <span className="text-base text-gray-900">
                                    {new Date(record.fields.EndTime).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-700 mb-1">Notes</span>
                                <span className="text-base text-gray-900">{record.fields.Notes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}