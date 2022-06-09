import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'

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
