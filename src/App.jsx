import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Cards from './pages/Cards/Cards'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In", user);
        navigate('/')
      } else {
        console.log("Logged Out");
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:imdbID" element={<Cards />} />
      </Routes>
    </div>
  )
}

export default App
