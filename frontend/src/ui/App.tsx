import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './Header/Header'
import { Home } from './Home/Home'
import { Lobby } from './Lobby/Lobby'
import { Footer } from '@src/ui/Footer/Footer'
import { UserProvider } from '@src/contexts/UserContext'

export function App(): JSX.Element | null {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/:id" component={Lobby} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  )
}
