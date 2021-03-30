import styled from '@emotion/styled'
import { Button } from 'reactstrap'

export const Card = styled(Button)({
  width: '3.2rem',
  height: '4rem',
  margin: '1rem',
  fontSize: '2rem',
  lineHeight: '3.6rem',
  padding: 0,
})

export const SmallCard = styled(Card)({
  width: '1.6rem',
  height: '2rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  margin: 0,
})
