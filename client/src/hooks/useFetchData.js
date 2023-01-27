import axios from "axios";
import { useEffect, useState } from "react";
import { usePostContext } from "./usePostContext";

const useFetchData = (url) => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = usePostContext()

    axios.defaults.baseURL = 'http://localhost:4000/api';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(url)
                dispatch({ type: 'SET_POSTS', payload: response.data })
            } catch (error) {
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [dispatch])

    return {  error, isLoading }

}

export default useFetchData