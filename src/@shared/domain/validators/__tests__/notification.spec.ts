import { Notification } from '../notification'

describe('Notification Unit Test', () => {
  let notification: Notification

  beforeEach(() => {
    notification = new Notification()
    notification.errors = new Map()
  })

  it('should add error', () => {
    notification.addError('error')

    expect(notification.errors.size).toBe(1)
    expect(notification.toJSON()).toEqual(['error'])
  })

  describe('should set error', () => {
    test('set a array of errors', () => {
      notification.setError(['error1', 'error2'], 'name')

      expect(notification.errors.size).toBe(1)
      expect(notification.toJSON()).toStrictEqual([
        {
          name: ['error1', 'error2'],
        },
      ])
    })

    test('set a string of error', () => {
      notification.setError('error')

      expect(notification.errors.size).toBe(1)
      expect(notification.toJSON()).toEqual(['error'])
    })
  })

  it('should set a array of errors', () => {
    notification.setError(['error_1', 'error_2'])

    expect(notification.errors.size).toBe(2)
    expect(notification.toJSON()).toEqual(['error_1', 'error_2'])
  })

  it('should check if has errors', () => {
    expect(notification.hasErrors()).toBe(false)

    notification.setError('error')

    expect(notification.hasErrors()).toBe(true)
  })

  it('should copy errors', () => {
    const notification = new Notification()

    notification.setError('error')

    notification.copyErrors(notification)

    expect(notification.errors.size).toBe(1)
    expect(notification.toJSON()).toEqual([{ error: ['error'] }])
  })

  it('should convert to JSON', () => {
    notification.setError('error')

    expect(notification.toJSON()).toEqual(['error'])
  })
})
