// import { useState } from 'react'
import { BrowserRouter, Navigate } from 'react-router'
import { Routes, Route } from 'react-router'
 
import './App.css'
import LandingPage from './pages/landing/index.ts'
import DashboardPage from './pages/dashboard/index.ts'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<LandingPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App