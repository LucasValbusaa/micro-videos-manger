import { generateErrorMessage } from '@/@shared/errors/exceptions/generate-error-message'
import { ValueObject } from '../value-object'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import {
  defaultDictionaryErrors,
  DefaultDictionaryErrors,
} from '@/@shared/errors/dictionary/default-dictionary-errors'

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
      generateErrorMessage(
        DefaultDictionaryErrors.INVALID_UUID,
        defaultDictionaryErrors,
      )
    }
  }
}
