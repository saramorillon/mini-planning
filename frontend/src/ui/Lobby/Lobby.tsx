import Cookies from 'js-cookie'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router'
import { NameForm } from '../NameForm/NameForm'
import { Room } from '../Room/Room'

export function Lobby(): JSX.Element {
  const [name, setName] = useState(Cookies.get('name') || '')

  const { id } = useParams<{ id: string }>()

  const onChange = useCallback((name: string) => {
    Cookies.set('name', name)
    setName(name)
  }, [])

  if (!name) {
    return <NameForm value={name} onChange={onChange} />
  }

  return <Room id={id} name={name} />
}
