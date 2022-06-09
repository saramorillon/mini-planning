import axios from 'axios'
import { IApp } from '../models/App'

export function getApp(): Promise<IApp | null> {
  return axios
    .get<IApp | null>('/api/app')
    .then((res) => res.data)
    .catch(() => null)
}
