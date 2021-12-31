import { Classes, Navbar, NavbarGroup } from '@blueprintjs/core'
import c from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header(): JSX.Element {
  return (
    <header>
      <Navbar>
        <NavbarGroup>
          <NavLink to="/" className={c(Classes.NAVBAR_HEADING, 'flex items-center')}>
            <img src="/favicon.svg" className="mr1" /> Mini Planning
          </NavLink>
        </NavbarGroup>
      </Navbar>
    </header>
  )
}
