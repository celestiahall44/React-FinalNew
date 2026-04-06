import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Cards from './pages/Cards/Cards'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const App = () => {

  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsCheckingAuth(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/movie/:imdbID" element={user ? <Cards /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
