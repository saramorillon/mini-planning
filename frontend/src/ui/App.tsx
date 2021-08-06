import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './Header/Header'
import { Home } from './Home/Home'
import { Lobby } from './Lobby/Lobby'

export function App(): JSX.Element | null {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:id" component={Lobby} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}
