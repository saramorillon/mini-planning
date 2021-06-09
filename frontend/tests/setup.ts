import { createSerializer, matchers } from '@emotion/jest'
import '@testing-library/jest-dom'

expect.extend(matchers)
expect.addSnapshotSerializer(createSerializer())

jest.mock('js-cookie')
jest.mock('fakerator')
jest.mock('socket.io-client')
jest.mock('axios')
jest.mock('uuid')
