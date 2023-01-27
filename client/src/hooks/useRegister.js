import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    axios.defaults.baseURL = 'http://localhost:4000/api';

    const register  = async(email , username , fullname , password , token , profileImage) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('/v1/user/register' , {email , username , fullname , password , token , profileImage})
            
            localStorage.setItem('user', JSON.stringify(response.data))

            dispatch({type:'LOGIN' , payload :response.data })
            setIsLoading(false)
            setError(null)
            
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.error)
            
        }
    }

    return {register , error , isLoading}
}