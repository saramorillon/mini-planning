import { createSerializer, matchers } from '@emotion/jest'
import '@testing-library/jest-dom'

expect.extend(matchers)
expect.addSnapshotSerializer(createSerializer())
