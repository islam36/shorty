import { useState, useEffect } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('shortyToken');
    const options = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        async function getData() {
            setLoading(true);

            try {
                const response = await fetch(url, options);
                const json = await response.json();
    
                setLoading(false);
                setData(json);
            } catch(err) {
                setLoading(false);
                console.log(err);
                setError(err);
            }
        }
        
        getData();

    }, [url]);

    return { loading, error, data };
}