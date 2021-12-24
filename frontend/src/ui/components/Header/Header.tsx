import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header(): JSX.Element {
  return (
    <header>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>
            <NavLink to="/">
              <img src="/favicon.svg" /> Mini Planning
            </NavLink>
          </NavbarHeading>
        </NavbarGroup>
      </Navbar>
    </header>
  )
}
