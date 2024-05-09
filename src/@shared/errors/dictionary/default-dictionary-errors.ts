import { ErrorObject } from './dictionary-types'

export enum DefaultDictionaryErrors {
  INVALID_UUID = 'VIDEOS-ADMIN-00001',
}

export const defaultDictionaryErrors: Record<
  DefaultDictionaryErrors,
  ErrorObject
> = {
  [DefaultDictionaryErrors.INVALID_UUID]: {
    status: '400',
    statusCode: 400,
    code: DefaultDictionaryErrors.INVALID_UUID,
    title: 'Invalid UUID',
    detail: 'The UUID provided is invalid.',
    source: {
      path: 'uuid-vo',
    },
    meta: {
      reason: 'The UUID provided is invalid.',
    },
    action: 'Check the UUID provided',
    children: [],
  },
}
