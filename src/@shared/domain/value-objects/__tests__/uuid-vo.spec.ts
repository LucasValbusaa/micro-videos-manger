import { DefaultErrorsCode } from '@/@shared/errors/dictionary/default-errors'
import { Uuid } from '../uuid-vo'
import { validate as uuidValidate } from 'uuid'

describe('Uuid Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const validateSpy = vi.spyOn(Uuid.prototype as any, 'validate')

  it('should throw a erro when uuid is invalid', () => {
    try {
      new Uuid('invalid-uuid')
    } catch (error) {
      expect(error.errorObject).toStrictEqual({
        status: '400',
        statusCode: 400,
        code: DefaultErrorsCode.INVALID_UUID,
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
        resolution: 'Check the UUID provided',
      })
      expect(validateSpy).toHaveBeenCalledTimes(1)
    }
  })

  it('should create a valid uuid', () => {
    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should accept a valid uuid', () => {
    const uuid = new Uuid('8a543ae5-63f4-4d7f-a34e-6b17a6ec0a6e')
    expect(uuid.id).toBe('8a543ae5-63f4-4d7f-a34e-6b17a6ec0a6e')
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
