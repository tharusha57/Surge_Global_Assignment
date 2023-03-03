import React, { useRef, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [emailOrPassword, setEmailOrPassword] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const reRef = useRef()
  const { login, error, isLoading } = useLogin()

  const onChange = (value) => {
    setToken(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(emailOrPassword, password, token)
    reRef.current.reset()
  }

  return (
    <div className='container'>
      <div className='container-left'>
        <form className="container-left-form-login" onSubmit={handleSubmit}>
          <h3>LOGIN</h3>
          <label>Email or Username : </label>
          <input
            value={emailOrPassword}
            onChange={(e) => setEmailOrPassword(e.target.value)}
          />
          
          <label>password : </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='captcha'> <ReCAPTCHA
            sitekey={'6LcOzyokAAAAAHaBP1OiWx9ivSoal5FlV19BRNsS'}
            onChange={onChange}
            ref={reRef}
          /></div>

          <button disabled={isLoading}>{isLoading ? 'Processing...' : 'Login'}</button>

          <a href='/register'>Don't Have an Account yet?</a>
        </form>
      </div>
      <div className='container-right'>
        <div className='container-right-details'>
          <h1>Social Media App</h1>
          {error && <div className='error'>
            <h4>{error}</h4>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Login
