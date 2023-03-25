import React from 'react'
import { useState, useEffect } from 'react'
import { Login } from './ApiRequests.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./Components/Navigation/Navigation"
import Footer from "./Components/Footer/Footer"
import Home from "./Components/Home/Home"
import LoginPage from "./Components/Login/Login"
import Prizes from "./Components/Prizes/Prizes"
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './Components/IMG_1081.jpeg'
import './Components/main.css'


const App = () => {
  const [userLogin, setUserLogin] = useState(false)
  const [user, setUser] = useState({ userName: '', _id: '' })

  const handleLogout = () => {
    setUserLogin(false)
  }

  const handleLogin = () => {
    setUserLogin(true)
  }

  //NOT IN USE
  useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
      const userId = localStorage.getItem('userId')
      const userName = localStorage.getItem('userName')

      if (!userLogin) {
        setUserLogin(true)
        setUser({ userName: userName, _id: userId })
      }
    }
  }, [])

  return (
    <div className='App main-div' >

      {/* <userContext.Provider value={{ userLogin: userLogin, user: user, logout: handleLogout, setUserLogin, setUser }}> */}
      <Router>
        <Navigation userLogin={userLogin} handleLogout={handleLogout}></Navigation>
        <div className="container" style={{ backgroundColor: 'white',  }}>
          <Routes>
            <Route path="/" element={<LoginPage userLogin={userLogin} handleLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/prizes" element={<Prizes />} />
          </Routes>
        </div>
      </Router>

      {/* </userContext.Provider> */}
    </div>
  );
}

export default App;