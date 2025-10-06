import {useEffect, useState} from "react";
import axios from "axios";


const useFetch = (url : string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setData(null);
        setError(null);

        axios.get(url)
            .then(res => {
                setIsLoading(false);

                if(res.data) {
                    setData(res.data);
                }
            })
            .catch(err => {
                setIsLoading(false)
                setError('An error occurred. Awkward..' + '\n' + err);
            });

    }, [url])

    return {data, isLoading, error}
}

export default useFetch;