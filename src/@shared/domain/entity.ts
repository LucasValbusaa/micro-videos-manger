import { Notification } from './validators/notification'
import { ValueObject } from './value-objects/value-object'

export abstract class Entity {
  abstract notification: Notification
  abstract entityId: ValueObject
  abstract toJSON(): any
}
