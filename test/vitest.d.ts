/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldsErrors } from '@/core/@shared/domain/validators/validators-fields-interface'
import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

interface CustomMatchers<R = unknown> {
  notificationContainsErrorMessages: (expected: FieldsErrors) => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
