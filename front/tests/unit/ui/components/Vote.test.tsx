import { render, screen } from '@testing-library/react'
import React from 'react'
import { Vote } from '../../../../src/ui/components/Vote.js'

describe('Vote', () => {
  it('should not show vote when hidden', () => {
    render(<Vote user={{ name: 'Toto', vote: '0' }} hidden />)
    expect(screen.getByText('✓')).toBeInTheDocument()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show vote when not hidden', () => {
    render(<Vote user={{ name: 'Toto', vote: '0' }} hidden={false} />)
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should hover user with hovered vote', () => {
    render(<Vote user={{ name: 'Toto', vote: '0' }} hidden={false} hovered="0" />)
    expect(screen.getByText('0')).toHaveClass('hovered')
  })

  it('should not hover user without hovered vote', () => {
    render(<Vote user={{ name: 'Toto', vote: '0' }} hidden={false} hovered="1" />)
    expect(screen.getByText('0')).not.toHaveClass('hovered')
  })
})
