import { ErrorObject } from '../dictionary/dictionary-types'
import { handleErrorMessage } from './handle-error-message'

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
