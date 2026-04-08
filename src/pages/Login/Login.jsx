import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { guestLogin, login, signup } from '../../firebase'

const HOME_SEARCH_STATE_KEY = 'flix-home-search-state'

const Login = () => {

  const[signState, setSignState] = useState("Sign In")
  const [name, setName] = useState ("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    if(signState==="Sign In"){
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  }

  const handleGuestLogin = async (event) => {
    event.preventDefault();

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(HOME_SEARCH_STATE_KEY)
    }

    await guestLogin();
  }


  return (
    <div className="login">
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up"?<input value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder="Your Name" />:<></>}
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email"/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" />
          <button onClick={user_auth} type="submit">{signState}</button>
          {signState === "Sign In" ? (
            <button className="guest-button" onClick={handleGuestLogin} type="button">Sign In as Guest</button>
          ) : null}
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"></input>
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In"?
          <p>New User? <span onClick={() => setSignState("Sign Up")}>Sign Up</span></p>
          :
          <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Login</span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
