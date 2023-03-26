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


import { userContext } from './Components/userContext'

const App = () => {
  const [userLogin, setUserLogin] = useState(true)
  const [user, setUser] = useState({ userName: '', _id: '' })

  const handleLogout = () => {
    setUserLogin(false)
  }

  //NOT IN USE
  useEffect(() => {
    if (localStorage.getItem('userName') && localStorage.getItem('userID') != '') {
      const userId = localStorage.getItem('userID')
      const userName = localStorage.getItem('userName')

      if (!userLogin) {
        setUserLogin(true)
        setUser({ userName: userName, userId: userId })
      }
    } 

  }, [])

  return (
    <div className='App main-div' style={{ height: '100%' }} >

      <userContext.Provider value={{ userLogin: userLogin, user: user, logout: handleLogout, setUserLogin, setUser }}>
        <Router>
          <Navigation></Navigation>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/prizes" element={<Prizes />} />
          </Routes>
        </Router>

      </userContext.Provider>
    </div>
  );
}

export default App;