import { Button, Classes, ControlGroup, InputGroup, Navbar, NavbarGroup } from '@blueprintjs/core'
import { useCopy } from '@saramorillon/hooks'
import c from 'classnames'
import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export function Header(): JSX.Element {
  const { pathname } = useLocation()
  const [authorized, , copy] = useCopy()
  const url = useMemo(() => window.location.protocol + '//' + window.location.host + pathname, [pathname])

  return (
    <header>
      <Navbar>
        <NavbarGroup>
          <NavLink to="/" className={c(Classes.NAVBAR_HEADING, 'flex items-center')}>
            <img src="/favicon.svg" className="mr1" /> Mini Planning
          </NavLink>
        </NavbarGroup>
        {authorized && pathname.startsWith('/room') && (
          <NavbarGroup align="right">
            <ControlGroup>
              <InputGroup defaultValue={url} size={url.length} readOnly />
              <Button icon="clipboard" intent="primary" onClick={() => copy(url)} />
            </ControlGroup>
          </NavbarGroup>
        )}
      </Navbar>
    </header>
  )
}
