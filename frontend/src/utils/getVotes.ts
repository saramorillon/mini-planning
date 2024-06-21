import type { User } from '../models/User.js'

export type Votes = { total: number; [key: string]: number }

export function getVotes(users: User[]): Votes {
  const result: Votes = { total: users.filter((user) => !user.observer).length }
  for (const user of users) {
    if (user.vote !== '') result[user.vote] = (result[user.vote] || 0) + 1
  }
  return result
}
