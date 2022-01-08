import { act } from '@testing-library/react'
import { Renderer, renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
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

export async function wait(): Promise<void> {
  return act(async () => new Promise((resolve) => setTimeout(resolve)))
}

export async function renderHookAsync<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
): Promise<RenderHookResult<TProps, TResult, Renderer<TProps>>> {
  const result = renderHook<TProps, TResult>(callback, options)
  await wait()
  return result
}
