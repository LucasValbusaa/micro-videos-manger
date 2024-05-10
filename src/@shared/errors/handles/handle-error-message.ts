import { ErrorObject } from '../dictionary/dictionary-types'
import { ExceptionError } from '../exceptions/exceptions-error'

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
  throw new ExceptionError(
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
  )
}
