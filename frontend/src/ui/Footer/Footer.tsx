import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { getVersion } from '@src/services/version'

const StyledFooter = styled.footer({
  borderTop: '1px solid #eee',
})

export function Footer(): JSX.Element {
  const [version, setVersion] = useState('')

  useEffect(() => {
    getVersion().then(setVersion)
  }, [])

  return (
    <StyledFooter className="text-muted text-center p-2 m-4">
      v{version} &copy; Sara Morillon {new Date().getFullYear()}
    </StyledFooter>
  )
}
