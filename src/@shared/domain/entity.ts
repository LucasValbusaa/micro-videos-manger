import { Notification } from './validators/notification'
import { ValueObject } from './value-object'

export abstract class Entity {
  abstract notification: Notification
  abstract entityId: ValueObject
  abstract toJSON(): any
}
