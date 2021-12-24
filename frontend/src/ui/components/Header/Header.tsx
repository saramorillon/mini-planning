import { Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import React from 'react'

export function Header(): JSX.Element {
  return (
    <header>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>
            <img src="/favicon.svg" /> Mini Planning
          </NavbarHeading>
        </NavbarGroup>
      </Navbar>
    </header>
  )
}
