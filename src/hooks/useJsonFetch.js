import {useState, useEffect} from 'react';

export default function useJsonFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(response => {
                setLoading(false)
                return response.json();       
            })
            .then(response => setData(response))
            .catch(error => setError(error.message))
    }, [url])

    return [data, loading, error]
}