import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem } from 'reactstrap'
import { useUserContext } from '@src/contexts/UserContext'

export function Header(): JSX.Element {
  const user = useUserContext()

  return (
    <header>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={NavLink} to="/">
          <img src="/favicon.svg" /> Mini planning
        </NavbarBrand>
        {user && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavbarText>Hello {user.name}</NavbarText>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </header>
  )
}
