import React from 'react'
import logo from '../assets/lighting.png'
import userImage from '../assets/user.png'
import Post from '../components/Post'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import useFetchData from '../hooks/useFetchData'
import { usePostContext } from '../hooks/usePostContext'

const Home = () => {

  const { user } = useAuthContext()
  const { logout } = useLogout()
  const { isLoading } = useFetchData('/v1/posts')
  const { posts } = usePostContext()

  const logoutUser = () => {
    logout()
  }
  console.log(user)
  return (
    <>
      {isLoading ? <h1>loading</h1> : <div className='home'>
        <div className='home-logo'>
          <img src={logo} alt='' /> <span className='logo-name'>Flashstagram</span>
        </div>
        <div className='home-posts'>

          {posts?.map((item) => {
            return <Post {...item} key={item._id} />
          })}

        </div>
        <div className='home-user'>
          <div className='home-user-details'>
            <div className='dp'><img src={user.profileImage ? user.profileImage: userImage} alt='' /></div>
            <h3>{user.fullname}</h3>
            <h4>@{user.username}</h4>
            <button onClick={logoutUser} className='logout-button'>Logout</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Home