import { ValueObject } from './value-object'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import {
  defaultErrors,
  DefaultErrorsCode,
} from '@/@shared/errors/dictionary/default-errors'
import { generateErrorMessage } from '@/@shared/errors/handles/generate-error-message'

export class Uuid extends ValueObject {
  readonly id: string
  constructor(id?: string) {
    super()
    this.id = id ?? uuidv4()
    this.validate()
  }

  private validate() {
    const isValid = uuidValidate(this.id)

    if (!isValid) {
      generateErrorMessage(DefaultErrorsCode.INVALID_UUID, defaultErrors)
    }
  }
}
