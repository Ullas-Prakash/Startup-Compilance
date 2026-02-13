import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Pages
import Login from './pages/login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Result from './pages/Result'
import Navbar from './pages/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'


export default function App() {
  return (
    <BrowserRouter> 
      <Navbar />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<Result />} />
        {/* default: open dashboard automatically */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* catch-all: redirect to dashboard */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
