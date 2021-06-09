import React, { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router'

export function router({ children }: PropsWithChildren<unknown>): JSX.Element {
  return <MemoryRouter>{children}</MemoryRouter>
}
