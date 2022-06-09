import { act } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { User } from '../src/models/User'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
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
  return act(() => new Promise((resolve) => setTimeout(resolve)))
}
