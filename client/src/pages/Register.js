import React, { useRef } from 'react'
import { useState } from 'react'
import { useRegister } from '../hooks/useRegister'
import ReCAPTCHA from "react-google-recaptcha";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import CheckIcon from '@mui/icons-material/Check';

const Register = () => {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [fullname, setFullname] = useState()
  const [password, setPassword] = useState()
  const [reapeatPassword, setreapeatPassword] = useState()
  const [token, setToken] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [uploaded , setUploaded] = useState(false)
  const [pwError , setPwError] = useState('')
  const reRef = useRef()
  const { register, error , isLoading} = useRegister()

  const onChange = (value) => {
    setToken(value)
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
        setUploaded(true)
      }
      fileReader.onerror = (error) => {
        reject(error)
        setUploaded(false)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === reapeatPassword) {
      await register(email, username, fullname, password, token, profileImage)
      reRef.current.reset()
    }else{
      setPwError('Passwords do not match')
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setProfileImage(base64)
  }

  return (
    <div className='container'>
      <div className='container-left register-left'>
        <form className="container-left-form-login" onSubmit={handleSubmit}>
          <h3>REGISTER</h3>

          <label>Email </label>
          <input
            type={'email'}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Username </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Full Name </label>
          <input
            onChange={(e) => setFullname(e.target.value)}
          />

          <label>password </label>
          <input
            type={'password'}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Retype password </label>
          <input
            type={'password'}
            onChange={(e) => setreapeatPassword(e.target.value)}
          />

          <label htmlFor='file-upload' className='custom-file-upload'><a>Upload Profile image {uploaded ? <CheckIcon className='upload-icon'/> :<PublishRoundedIcon className='upload-icon' />}</a></label>
          <input
            type='file'
            label='image'
            name='myFile'
            id='file-upload'
            accept='.jpeg ,.png,.jpg'
            className='image-input'
            onChange={(e) => handleFileUpload(e)}
          />

          <div className='captcha'> <ReCAPTCHA
            sitekey={'6LcOzyokAAAAAHaBP1OiWx9ivSoal5FlV19BRNsS'}
            onChange={onChange}
            ref={reRef}
          /></div>
        
          <button disabled={isLoading}>{isLoading ? 'Processing...' : 'Register'}</button>

          <a href='/login'>Already have an Account?</a>
        </form>
      </div>
      <div className='container-right'>
        <div className='container-right-details'>
          <h1>Surge SE Internship</h1>
          <h2>March 2023</h2>
          <h3>THARUSHA GEETHANJANA</h3>
          {error && <div className='error'>
            <h4>{error}</h4>
          </div>}
          {pwError && <div className='error'>
            <h4>{pwError}</h4>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Register