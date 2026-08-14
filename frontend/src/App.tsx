// import { useState } from 'react'
import { BrowserRouter, Navigate } from 'react-router'
import { Routes, Route } from 'react-router'

import './App.css'
import LandingPage from './pages/landing/index.ts'
import DashboardPage from './pages/dashboard/index.ts'
import SandboxPage from './pages/sandbox/index.ts'

import AdminPage from './pages/admin/index.ts'
import AdminSectionPlaceholder from './pages/admin/AdminSectionPlaceholder'
import AdminOverview from './components/AdminPanel/AdminOverview.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {import.meta.env.DEV && (
          <Route path="/dev" element={<SandboxPage />} />
        )}

        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminOverview/>} />
          <Route path="regions" element={<AdminSectionPlaceholder title="Regions" />} />
          <Route path="simulation" element={<AdminSectionPlaceholder title="Simulation" />} />
          <Route path="settings" element={<AdminSectionPlaceholder title="Settings" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App