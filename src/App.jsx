import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import backgroundImage from './assets/cash.jpg';

function Inside() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <div className="login-box">
      <div className="welcome">
       <h3><b>Welcome!</b></h3>
       <p>First time?</p>
       <button type="button">Register here</button>
      </div>
      
      <div className="login">
       <h3>Sign in</h3>
       <input type="text" placeholder="Username"></input>
       <input type="password" placeholder="Password"></input>
       <button type="submit">Login</button>
      </div>
    </div>
    </div>
  )
}

function App(){
  return(
  <div class="container" style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', 
          }}>
      {/*<img src={viteLogo}></img>*/}
      <Inside/>
  </div>
  )
}
export default App
