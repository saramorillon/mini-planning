import { Button } from '@blueprintjs/core'
import styled from 'styled-components'

export const Card = styled(Button)<{ $nohover?: boolean }>(({ $nohover }) => ({
  width: '3.2rem',
  height: '4rem',
  fontSize: '2rem',
  lineHeight: '3.6rem',
  padding: 0,
  ...($nohover && {
    cursor: 'initial',
  }),
}))

export const SmallCard = styled(Card)({
  width: '1.6rem',
  height: '2rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
})
