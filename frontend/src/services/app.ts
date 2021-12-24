import { request } from './wrapper'
import { IApp } from '@src/models/App'

export async function getApp(): Promise<IApp | null> {
  return request<IApp | null>({ url: '/api/app' }, null)
}
