import { Classes, Colors } from '@blueprintjs/core'
import { useTheme } from '@saramorillon/hooks'
import c from 'classnames'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Lobby } from './pages/Lobby/Lobby'

const GlobalStyles = createGlobalStyle({ html: { backgroundColor: Colors.DARK_GRAY2 } })

export function App(): JSX.Element | null {
  const theme = useTheme()

  return (
    <div className={c({ [Classes.DARK]: theme === 'dark' })}>
      {theme === 'dark' && <GlobalStyles />}
      <BrowserRouter>
        <div className="flex flex-column items-stretch" style={{ minHeight: '100vh' }}>
          <Header />
          <div className="flex-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:id" element={<Lobby />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}
