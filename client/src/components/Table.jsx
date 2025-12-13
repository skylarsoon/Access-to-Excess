import React from 'react';
import { useState, useEffect } from 'react';

export default function Table() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/data');

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
    }, []);
    // console.log(data)
    if (loading) return <div> Loading... </div>;
    if (error) return <div> Error: {error} </div>

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}