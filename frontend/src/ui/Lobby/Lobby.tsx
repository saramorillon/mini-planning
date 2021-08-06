import React from 'react'
import { useParams } from 'react-router'
import { NameForm } from '../NameForm/NameForm'
import { Room } from '../Room/Room'
import { useUserContext } from '@src/contexts/UserContext'

export function Lobby(): JSX.Element {
  const user = useUserContext()
  const { id } = useParams<{ id: string }>()

  if (!user) {
    return <NameForm />
  }

  return <Room id={id} user={user} />
}
