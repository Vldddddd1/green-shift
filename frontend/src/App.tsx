// import { useState } from 'react'
import { BrowserRouter, Navigate } from 'react-router'
import { Routes, Route, Outlet } from 'react-router'

import './App.css'
import LandingPage from './pages/landing/index.ts'
import DashboardPage from './pages/dashboard/index.ts'
import SandboxPage from './pages/sandbox/index.ts'

import AdminPage from './pages/admin/index.ts'
import AdminLoginPage from './pages/admin/AdminLoginPage.tsx'
import RequireAdminAuth from './pages/admin/RequireAdminAuth.tsx'
import AdminOverview from './components/AdminPanel/AdminOverview.tsx'
import AdminRegions from './components/AdminPanel/AdminRegions.tsx'
import AdminSettings from './components/AdminPanel/AdminSettings.tsx'
import AdminSimulation from './components/AdminPanel/AdminSimulation.tsx'

import { AuthProvider } from './hooks/AuthProvider.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {import.meta.env.DEV && (
          <Route path="/dev" element={<SandboxPage/>} />
        )}

        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />

        <Route element = {<AuthProvider><Outlet/></AuthProvider>}>
          <Route path="/admin/login" element={<AdminLoginPage/>} />

          <Route path="/admin" element={<RequireAdminAuth><AdminPage/></RequireAdminAuth>}>
            <Route index element={<AdminOverview/>} />
            <Route path="regions" element={<AdminRegions/>} />
            <Route path="simulation" element={<AdminSimulation />} />
            <Route path="settings" element={<AdminSettings/>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App