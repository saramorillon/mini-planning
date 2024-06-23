import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.js'
import { Header } from './components/Header.js'
import { Home } from './pages/Home.js'
import { Lobby } from './pages/Lobby.js'

export function App(): JSX.Element | null {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Lobby />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className="flex flex-column items-stretch" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="flex-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
