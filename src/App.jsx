import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import './App.css'
import backgroundImage from './assets/cash.jpg';
import settingsImage from './assets/settings.png';
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx'
import Ana from './Ana.jsx'
import Trans from './Trans.jsx'
import Bills from './Bills.jsx'
import Split from './Split.jsx'
import Invest from './Invest.jsx'

function Inside() {
  const [signReg, setSignReg] = useState("Register Here");
  const [heading, setHeading] = useState("Sign In");
  const [buttonc, setButton] = useState("Login");

  return (
    <div>
    <div className="login-box">
      <div className="welcome">
       <h3><b>Welcome!</b></h3>
       <p>First time?</p>
       <button type="button" onClick={()=>{
        if(signReg=="Register Here")
        {setSignReg("Sign In Here");
        setHeading("Sign Up");
        setButton("Register");
        }
        else{
          setSignReg("Register Here");
        setHeading("Sign In");
        setButton("Login");
        }
       }}>{signReg}</button>
      </div>
      <div className="login">
       <h3>{heading}</h3>
       <input type="text" placeholder="Username"></input>
       <input type="password" placeholder="Password"></input>
       <button type="submit">{buttonc}</button>
    </div>
      
    </div>
    </div>
  )
}

function Main(){
  return(
  <div className="container" style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', 
          }}>
      {/*<img src={viteLogo}></img>*/}
      <Inside/>
  </div>
  )
}

function App(){

  return(
    <div className="everything">
    <BrowserRouter>
    <nav>
    <div className="navbar">
    <div className="home">
    <img src={viteLogo}></img>
    <Link className="link" to="/"><b>Home</b></Link>
    </div>
    <div className="things">
      <div className="thing"><Link className="link" to="/analysis"><b>Analysis</b></Link></div>
      <div className="thing"><Link className="link" to="/transactions"><b>Transactions</b></Link></div>
      <div className="thing"><Link className="link" to="/bills-due"><b>Bills Due</b></Link></div>
      <div className="thing"><Link className="link" to="/splitting"><b>Splitting Bills</b></Link></div>
      <div className="thing"><Link className="link" to="/investments"><b>Investments</b></Link></div>
    </div>
    <div className="settings">
      <img src={settingsImage}></img>
      <Link className="link" to="/settings"><b>Settings</b></Link>
    </div>
    </div>
    </nav>
    
    <div className="the-main-part">
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/analysis" element={<Ana/>}/>
    <Route path="/transactions" element={<Trans/>}/>
    <Route path="/bills-due" element={<Bills/>}/>
    <Route path="/splitting" element={<Split/>}/>
    <Route path="/investments" element={<Invest/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </div>
  )
}

export default App

{/*  the version I used
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import './App.css'
import backgroundImage from './assets/cash.jpg';
import settingsImage from './assets/settings.png';
import {BrowserRouter,Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx'
import Ana from './Ana.jsx'
import Trans from './Trans.jsx'
import Bills from './Bills.jsx'
import Split from './Split.jsx'
import Invest from './Invest.jsx'

function Inside() {
  const [signReg, setSignReg] = useState("Register Here");
  const [heading, setHeading] = useState("Sign In");
  const [buttonc, setButton] = useState("Login");

  return (
    <div>
    <div className="login-box">
      <div className="welcome">
       <h3><b>Welcome!</b></h3>
       <p>First time?</p>
       <button type="button" onClick={()=>{
        if(signReg=="Register Here")
        {setSignReg("Sign In Here");
        setHeading("Sign Up");
        setButton("Register");
        }
        else{
          setSignReg("Register Here");
        setHeading("Sign In");
        setButton("Login");
        }
       }}>{signReg}</button>
      </div>
      <div className="login">
       <h3>{heading}</h3>
       <input type="text" placeholder="Username"></input>
       <input type="password" placeholder="Password"></input>
       <button type="submit">{buttonc}</button>
    </div>
      
    </div>
    </div>
  )
}

function Main(){
  return(
  <div class="container" style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', 
          }}>
      {/*<img src={viteLogo}></img>*}
      <Inside/>
  </div>
  )
}

function App(){

  return(
    <>
    <BrowserRouter>
    <div className='app-wrapper'>
    <nav>
    <div className="navbar">
    <div className="home">
    <img src={viteLogo}></img>
    <Link className="link" to="/"><b>Home</b></Link>
    </div>
    <div className="things">
      <div className="thing"><Link className="link" to="/analysis"><b>Analysis</b></Link></div>
      <div className="thing"><Link className="link" to="/transactions"><b>Transactions</b></Link></div>
      <div className="thing"><Link className="link" to="/bills-due"><b>Bills Due</b></Link></div>
      <div className="thing"><Link className="link" to="/splitting"><b>Splitting Bills</b></Link></div>
      <div className="thing"><Link className="link" to="/investments"><b>Investments</b></Link></div>
    </div>
    <div className="settings">
      <img src={settingsImage}></img>
      <Link className="link" to="/settings"><b>Settings</b></Link>
    </div>
    </div>
    </nav>
    
    <div className="the-main-part">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysis" element={<Ana />} />
      <Route path="/transactions" element={<Trans />} />
      <Route path="/bills-due" element={<Bills />} />
      <Route path="/splitting" element={<Split />} />
      <Route path="/investments" element={<Invest />} />
    </Routes>
    </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
*/}
