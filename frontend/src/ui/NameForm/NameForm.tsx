import React, { useCallback, useState } from 'react'
import { Button, Form, FormGroup, Input, Jumbotron } from 'reactstrap'
import Fakerator from 'fakerator'

interface INameFormProps {
  value: string
  onChange: (value: string) => void
}

export function NameForm({ value, onChange }: INameFormProps): JSX.Element {
  const [name, setName] = useState(value)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      onChange(name)
    },
    [name, onChange]
  )

  return (
    <Jumbotron>
      <h1>What&apos;s your name?</h1>
      <hr className="my-4" />
      <Form inline onSubmit={onSubmit}>
        <FormGroup className="mr-2">
          <Input
            type="text"
            placeholder={new Fakerator(navigator.language).names.firstName()}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <Button color="primary">Send</Button>
      </Form>
    </Jumbotron>
  )
}
