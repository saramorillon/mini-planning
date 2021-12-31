import { Button, Callout, Classes } from '@blueprintjs/core'
import { useFetch } from '@saramorillon/hooks'
import c from 'classnames'
import React, { useState } from 'react'
import { getApp } from '../../../services/app'
import { Info } from '../Info/Info'

export function Footer(): JSX.Element | null {
  const [app] = useFetch(getApp, null)
  const [open, setOpen] = useState(false)

  if (!app) return null

  return (
    <Callout className={c('mt2 p2 not-rounded center', Classes.TEXT_SMALL)}>
      <b>{app.name}</b> <small>v{app.version}</small> <Button icon="info-sign" minimal onClick={() => setOpen(true)} />
      <Info open={open} toggle={() => setOpen(false)} app={app} />
    </Callout>
  )
}
