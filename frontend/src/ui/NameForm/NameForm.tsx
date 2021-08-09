import Fakerator from 'fakerator'
import Cookies from 'js-cookie'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap'

export function NameForm(): JSX.Element {
  const placeholder = useMemo(() => new Fakerator(navigator.language).names.firstName(), [])
  const [name, setName] = useState('')
  const [observer, setObserver] = useState(false)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      Cookies.set('user', JSON.stringify({ name, observer }))
    },
    [name, observer]
  )

  return (
    <Jumbotron>
      <h1>What&apos;s your name?</h1>
      <hr className="my-4" />
      <Form inline onSubmit={onSubmit}>
        <FormGroup className="mr-2">
          <Input type="text" placeholder={placeholder} value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup className="mr-2" check>
          <Label check>
            <Input type="checkbox" checked={observer} onChange={(e) => setObserver(e.target.checked)} />
            Observer
          </Label>
        </FormGroup>
        <Button color="primary">Send</Button>
      </Form>
    </Jumbotron>
  )
}
