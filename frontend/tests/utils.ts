import { act as _act, render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'

export function act(fn: (...args: unknown[]) => unknown): void {
  _act(() => {
    fn()
  })
}

export async function wait(): Promise<void> {
  return _act(async () => new Promise((resolve) => setTimeout(resolve)))
}

export async function renderAsync(comp: ReactElement, options?: Omit<RenderOptions, 'queries'>): Promise<RenderResult> {
  const result = render(comp, options)
  await wait()
  return result
}
