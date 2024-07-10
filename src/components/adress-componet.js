import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomeAddress.css';

function AxiosT() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.everythinglocation.com/address/complete', {
                    params: {
                        lqtkey: 'HE59-YH98-MP91-ZJ44',
                        query: query,
                        country: 'INDIA'
                    }
                });
                setData(response.data); // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (query.trim() !== '') {
            fetchData();
        }
    }, [query]); // Fetch data whenever query state changes

    const handleInputChange = (event) => {
        setQuery(event.target.value); // Update query state as user types
    };

    const handleAddressClick = (address) => {
        setQuery(address); // Set selected address as the input value
        setData(null); // Clear the data to hide suggestions
    };

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="Type an address..."
                value={query}
                onChange={handleInputChange}
                className="input-field"
            />
            {data ? (
                <div className="suggestions-container">
                    {data.output.map((address, index) => (
                        <div
                            key={index}
                            onClick={() => handleAddressClick(address)}
                            className="suggestion"
                        >
                            {address}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default AxiosT;
