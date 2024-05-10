import { ErrorObject } from '../dictionary/dictionary-types'

export class ExceptionError extends Error {
  public readonly errorObject: ErrorObject

  constructor(
    code: string,
    title: string,
    detail: string,
    status: string,
    statusCode: number,
    meta?: Record<string, unknown>,
    action?: string,
    source?: Record<string, unknown>,
    children?: Record<string, unknown>[],
    resolution?: string,
  ) {
    super(title)
    this.errorObject = {
      status,
      statusCode,
      code,
      title,
      detail,
      source,
      meta,
      action,
      children,
      resolution,
    }
  }
}
