import { Classes, Dialog, Icon } from '@blueprintjs/core'
import { useTheme } from '@saramorillon/hooks'
import c from 'classnames'
import React from 'react'
import { IApp } from '../../../models/App'

export interface IInfoProps {
  app: IApp
  open: boolean
  toggle: () => void
}

export function Info({ app, open, toggle }: IInfoProps): JSX.Element | null {
  const theme = useTheme()
  return (
    <Dialog onClose={toggle} isOpen={open} title="Information" className={c({ [Classes.DARK]: theme === 'dark' })}>
      <div className={`center ${Classes.DIALOG_BODY}`}>
        <b>{app.name}</b> <span>v{app.version}</span>
        <br />
        <a href={app.repository.url} target="_blank" rel="noopener noreferrer">
          <Icon icon="git-branch" /> {app.repository.url}
        </a>
        <br />
        <a href={app.author.url} target="_blank" rel="noopener noreferrer">
          <Icon icon="globe" /> {app.author.url}
        </a>
        <br />
        &copy; {app.author.name} {new Date().getFullYear()}
      </div>
    </Dialog>
  )
}
