import { FocusStyleManager } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'basscss/css/basscss.css'
import 'normalize.css/normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './ui/App'

FocusStyleManager.onlyShowFocusOnTabs()

ReactDOM.render(<App />, document.getElementById('root'))
