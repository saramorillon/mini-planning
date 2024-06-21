import type { IApp } from '../models/App.js'

export function getApp(): Promise<IApp | null> {
  return fetch('/api/app')
    .then((res) => res.json())
    .catch(() => null)
}
