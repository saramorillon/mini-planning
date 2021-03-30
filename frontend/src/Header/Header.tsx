import Cookies from 'js-cookie'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem } from 'reactstrap'

export function Header(): JSX.Element {
  const name = Cookies.get('name')

  return (
    <header>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={NavLink} to="/">
          <img src="/favicon.svg" /> Mini board
        </NavbarBrand>
        {name && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavbarText>Hello {name}</NavbarText>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </header>
  )
}
