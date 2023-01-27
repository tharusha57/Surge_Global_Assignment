import React from 'react'
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import formatDistanceToNowStrict from "date-fns/formatDistanceToNow"
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { usePostContext } from '../hooks/usePostContext';

function Post({ postedBy, photo, likes, createdAt , _id}) {
    const {user} = useAuthContext()
    const [liked , setLiked] = useState(likes.includes(user._id)) 
    const [likesCount , setLikesCount] = useState(likes.length)
    const {dispatch , posts} = usePostContext()

    axios.defaults.baseURL = 'http://localhost:4000/api';
    
    const likeDetails = {
        userId : user._id,
        _id 
    }

    const toggleLike = async() => {
        setLiked((value) => !value)


        //Post Likes and unlikes 
        if(!liked){
            try {
                const response = await axios.put('/v1/posts/like' , likeDetails , {
                    headers : {
                        'Authorization' : `Bearer ${user.token}`
                    }
                })
                console.log(response.data)
                setLikesCount((value) => value + 1)
                dispatch({type : 'SET_POST' , payload : response.data})

                console.log(posts)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const response = await axios.put('/v1/posts/unlike' , likeDetails , {
                    headers : {
                        'Authorization' : `Bearer ${user.token}`
                    }
                })
                console.log(response.data)
                setLikesCount((value) => value - 1)
                dispatch({type : 'SET_POST' , payload : response.data})


            } catch (error) {
                console.log(error)
            }
        }
    }

    //Change output format of the date fns
    let fixedDate = ''
    const convertDate = () => {
        const date = formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true })
        if(date.split(' ')[2].toLowerCase() === 'month'){
            fixedDate = date.split(' ')[1] + 'mo'
        }else if(date.split(' ')[2].toLowerCase() === 'hour'){
            fixedDate = date.split(' ')[1] + 'h'
        }else if(date.split(' ')[2].toLowerCase() === 'day'|| 'days'){
            fixedDate = date.split(' ')[1] + 'd'
        }else{
            fixedDate = date.split(' ')[1] + 'm'
        }
    }
    convertDate()

    return (
        <div className='post'>
            <div className='post-container'>
                <img src={photo} alt="" />
            </div>
            <div className='post-details'>
                <div className='post-details-container'>
                    <div className='post-details-likes' onClick={toggleLike}>
                    {liked? <FavoriteIcon color="warning"/> : <FavoriteBorderOutlinedIcon />}
                        <p>{likesCount}</p>
                    </div>

                    <p className='post-details-name'>{postedBy.name}</p>
                    <p className='post-details-date'>{fixedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default Post