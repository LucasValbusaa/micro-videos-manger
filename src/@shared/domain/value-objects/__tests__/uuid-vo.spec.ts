import { Uuid } from '../uuid-vo'
import { validate as uuidValidate } from 'uuid'

describe('Uuid Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const validateSpy = vi.spyOn(Uuid.prototype as any, 'validate')

  it('should throw a erro when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrowError(
      expect.objectContaining({
        name: 'Invalid UUID',
        message: 'The UUID provided is invalid.',
        error: {
          code: 'VIDEOS-ADMIN-00001',
          title: 'Invalid UUID',
          detail: 'The UUID provided is invalid.',
          status: '400',
          statusCode: 400,
          meta: { reason: 'The UUID provided is invalid.' },
          action: 'Check the UUID provided',
          source: { path: 'uuid-vo' },
          children: [],
          resolution: undefined,
        },
      }),
    )
    expect(validateSpy).toHaveBeenCalledTimes(1)
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
