import { Classes } from '@blueprintjs/core'
import { useTheme } from '@saramorillon/hooks'
import c from 'classnames'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { UserProvider } from '@src/contexts/UserContext'
import { Footer } from '@src/ui/components/Footer/Footer'
import { Header } from '@src/ui/components/Header/Header'
import { Home } from '@src/ui/pages/Home/Home'
import { Lobby } from '@src/ui/pages/Lobby/Lobby'

const GlobalStyles = createGlobalStyle({ html: { backgroundColor: '#202020' } })

export function App(): JSX.Element | null {
  const theme = useTheme()

  return (
    <div className={c({ [Classes.DARK]: theme === 'dark' })}>
      {theme === 'dark' && <GlobalStyles />}
      <UserProvider>
        <BrowserRouter>
          <div className="flex flex-column items-stretch" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="flex-auto">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/room/:id" component={Lobby} />
                <Redirect to="/" />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}
