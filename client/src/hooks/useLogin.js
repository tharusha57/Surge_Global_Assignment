
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const { dispatch } = useAuthContext()

    axios.defaults.baseURL = 'http://localhost:4000/api';

    const login = async (emailOrUsername, password, token) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('/v1/user/login', { emailOrUsername, password, token })

            localStorage.setItem('user', JSON.stringify(response.data))

            dispatch({ type: 'LOGIN', payload: response.data })
            setIsLoading(false)
            setError(null)

        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.error)
        }
    }

    return { login, error, isLoading }
}


