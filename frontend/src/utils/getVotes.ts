import { User } from '../models/User'

export type Votes = { total: number; [key: string]: number }

export function getVotes(users: User[]): Votes {
  const result: Votes = { total: users.length }
  return users.reduce((acc, curr) => ({ ...acc, [curr.vote]: (acc[curr.vote] || 0) + 1 }), result)
}
