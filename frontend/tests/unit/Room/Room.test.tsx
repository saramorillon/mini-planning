import { Room } from '@src/Room/Room'
import { fireEvent, screen } from '@testing-library/react'
import { act, renderAsync } from '@tests/utils'
import axios from 'axios'
import { EventEmitter } from 'events'
import React from 'react'
import io from 'socket.io-client'

const axiosPostMock = axios.post as jest.Mock
const ioMock = (io as unknown) as jest.Mock

describe('Room', () => {
  let socketMock: EventEmitter

  beforeEach(() => {
    ioMock.mockReturnValue((socketMock = new EventEmitter()))
    axiosPostMock.mockResolvedValue(undefined)
  })

  it('should connect to room namespace', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    expect(io).toHaveBeenCalledWith('/id')
  })

  it('should connect socket', async () => {
    const onSpy = jest.spyOn(socketMock, 'on')
    await renderAsync(<Room id="id" name="Toto" />)
    expect(onSpy).toHaveBeenCalledWith('connect', expect.any(Function))
  })

  it('should join room', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    expect(emitSpy).toHaveBeenCalledWith('join', 'Toto')
  })

  it('should show "Show votes" button when voting', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    expect(screen.getByText('Show votes')).toBeInTheDocument()
  })

  it('should show active cards when voting', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    expect(screen.getByText('0')).toBeEnabled()
  })

  it('should show "Reset" button when not voting', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    act(() => socketMock.emit('refresh', { voting: false, users: [] }))
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('should show inactive cards when not voting', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    act(() => socketMock.emit('refresh', { voting: false, users: [] }))
    expect(screen.getByText('0')).toBeDisabled()
  })

  it('should emit vote event when clicking on card', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    fireEvent.click(screen.getByText('0'))
    expect(emitSpy).toHaveBeenCalledWith('vote', '0')
  })

  it('should emit voting event when clicking on "Show votes" button', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    fireEvent.click(screen.getByText('Show votes'))
    expect(emitSpy).toHaveBeenCalledWith('voting', false)
  })

  it('should emit voting event when clicking on "Reset" button', async () => {
    const emitSpy = jest.spyOn(socketMock, 'emit')
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    act(() => socketMock.emit('refresh', { voting: false, users: [] }))
    fireEvent.click(screen.getByText('Reset'))
    expect(emitSpy).toHaveBeenCalledWith('voting', true)
  })

  it('should refresh users', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    act(() => socketMock.emit('refresh', { voting: false, users: [{ name: 'Titi' }] }))
    expect(screen.getByText('Titi')).toBeInTheDocument()
  })

  it('should hide votes when voting', async () => {
    await renderAsync(<Room id="id" name="Toto" />)
    act(() => socketMock.emit('connect'))
    act(() => socketMock.emit('refresh', { voting: true, users: [{ name: 'Titi', vote: '0' }] }))
    expect(screen.getByText('✓')).toBeInTheDocument()
  })
})
