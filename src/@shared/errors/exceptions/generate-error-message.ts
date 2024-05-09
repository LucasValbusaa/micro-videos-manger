import { ErrorObject } from '../dictionary/dictionary-types'
import { AppError } from './app-error'

export const handleErrorMessage = (errorData: ErrorObject) => {
  const {
    code,
    detail,
    status,
    statusCode,
    title,
    action,
    children,
    meta,
    source,
    resolution,
  } = errorData
  throw new AppError({
    code,
    title,
    detail,
    status,
    statusCode,
    meta,
    action,
    source,
    children,
    resolution,
  })
}

export function generateErrorMessage<T = any>(
  code: string,
  errorsSchema: Record<string, ErrorObject>,
  meta?: T,
  path?: string,
) {
  const error = errorsSchema[code]

  if (error) {
    error.source.path = path ?? error.source.path
  }

  for (const key in meta) {
    error.meta[key] = meta[key]
  }

  return handleErrorMessage(error)
}
