import './index.css'
import logo from './icons/lightbulb.png'

// import { useState } from 'react'


function Login() {
  // const [isLoggined, setisLoggined] = useState(true)

  // let isShow = 
  // const toggleLogin = () => {
  //   setisLoggined(!isLoggined)
  // }
  return (
    <div className="html">
      <header className="login-header">
        <h1>Welcome to Music World! Friend</h1>
      </header>
      <div className="login-container">
        <div className="right">
          <img src={logo} alt="logo"></img>
        </div>
        <form className="login-form">
          <div className="form-item">
            <input placeholder="username"></input>
          </div>
          <div className="form-item">
            <input placeholder="phone"></input>
          </div>
          <div className="form-item">
            <input placeholder="password"></input>
          </div>
          <div className="form-item">
            <input placeholder="confirm password"></input>
          </div>
          <div className="form-item">
            <button>Sign Up / Sign In</button>
          </div>
        </form>
      </div>
    </div> 
  )
}

export default Login