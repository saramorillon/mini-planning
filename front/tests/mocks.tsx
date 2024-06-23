import { act } from '@testing-library/react'
import React, { type PropsWithChildren } from 'react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import type { Mock } from 'vitest'
import type { User } from '../src/models/User.js'

export function mock(fn: unknown): Mock {
  return fn as Mock
}

export function mockNavigate(): Mock {
  const navigate = vi.fn()
  mock(useNavigate).mockReturnValue(navigate)
  return navigate
}

export function mockUser(user?: Partial<User>): User {
  return { name: 'name', observer: false, vote: '', ...user }
}

export function router(initialRoute = '/') {
  return function Router({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  }
}

export function wait(): Promise<void> {
  return act(() => new Promise<void>((resolve) => setTimeout(resolve)))
}
