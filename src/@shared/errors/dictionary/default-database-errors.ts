import { ErrorObject } from './dictionary-types'

export enum DefaultDatabaseErrorsCode {
  DB_NOT_FOUND_SCHEMA = 'VIDEOS_ADMIN-00010',
  DB_INVALID_ARGUMENT = 'VIDEOS_ADMIN-00011',
  DB_CANNOT_INSERT = 'VIDEOS_ADMIN-00012',
  DB_CANNOT_UPDATE = 'VIDEOS_ADMIN-00013',
}

export const defaultDatabaseErrors: Record<
  DefaultDatabaseErrorsCode,
  ErrorObject
> = {
  [DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA]: {
    status: '404',
    statusCode: 404,
    code: DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
    title: 'Schema not found',
    detail: 'The schema requested was not found.',
    source: {
      path: '',
    },
    meta: {
      reason: 'The schema requested was not found.',
    },
    action: 'Check the data or id provided',
    children: [],
  },
  [DefaultDatabaseErrorsCode.DB_INVALID_ARGUMENT]: {
    status: '400',
    statusCode: 400,
    code: DefaultDatabaseErrorsCode.DB_INVALID_ARGUMENT,
    title: 'Invalid argument',
    detail: 'The argument provided is invalid.',
    source: {
      path: '',
    },
    meta: {
      reason: 'The argument provided is invalid.',
    },
    action: 'Check the argument provided',
    children: [],
  },
  [DefaultDatabaseErrorsCode.DB_CANNOT_INSERT]: {
    status: '500',
    statusCode: 500,
    code: DefaultDatabaseErrorsCode.DB_CANNOT_INSERT,
    title: 'Cannot insert',
    detail: 'Cannot insert the entity in the database.',
    source: {
      path: '',
    },
    meta: {
      reason: 'Cannot insert the entity in the database.',
    },
    action: 'Check the entity provided',
    children: [],
  },
  [DefaultDatabaseErrorsCode.DB_CANNOT_UPDATE]: {
    status: '500',
    statusCode: 500,
    code: DefaultDatabaseErrorsCode.DB_CANNOT_UPDATE,
    title: 'Cannot update',
    detail: 'Cannot update the entity in the database.',
    source: {
      path: '',
    },
    meta: {
      reason: 'Cannot update the entity in the database.',
    },
    action: 'Check the entity provided',
    children: [],
  },
}
