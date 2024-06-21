import { User } from '../models/User.js'

export type Votes = { total: number; [key: string]: number }

export function getVotes(users: User[]): Votes {
  const result: Votes = { total: users.filter((user) => !user.observer).length }
  return users.reduce((acc, curr) => (curr.vote ? { ...acc, [curr.vote]: (acc[curr.vote] || 0) + 1 } : acc), result)
}
