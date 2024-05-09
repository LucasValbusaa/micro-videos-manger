import { ErrorObject } from '../dictionary/dictionary-types'

export class AppError extends Error {
  public error: ErrorObject
  constructor(error: ErrorObject) {
    super(error.detail)
    this.name = error.title
    this.error = error
  }
}
