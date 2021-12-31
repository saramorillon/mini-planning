import { act, render, RenderOptions, RenderResult } from '@testing-library/react'
import React, { PropsWithChildren, ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

export function mock(fn: unknown): jest.Mock {
  return fn as jest.Mock
}

export function router({ children }: PropsWithChildren<unknown>): JSX.Element {
  return <MemoryRouter>{children}</MemoryRouter>
}

export async function wait(): Promise<void> {
  return act(async () => new Promise((resolve) => setTimeout(resolve)))
}

export async function renderAsync(comp: ReactElement, options?: Omit<RenderOptions, 'queries'>): Promise<RenderResult> {
  const result = render(comp, options)
  await wait()
  return result
}
