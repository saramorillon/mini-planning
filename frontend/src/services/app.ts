import axios from 'axios'
import { IApp } from '../models/App'

export async function getApp(): Promise<IApp | null> {
  return axios
    .get<IApp | null>('/api/app')
    .then((res) => res.data)
    .catch(() => null)
}
