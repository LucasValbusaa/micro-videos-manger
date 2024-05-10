import { Entity } from '../entity'
import { Notification } from '../validators/notification'
import { Uuid } from '../value-objects/uuid-vo'

class SutClass extends Entity {
  notification: Notification
  constructor(public id: Uuid) {
    super()
  }

  get entityId() {
    return this.id
  }

  toJSON() {
    return { id: this.id }
  }
}

describe('Entity Class Unit Tests', () => {
  it('should create a new Entity instance', () => {
    const uuid = new Uuid()
    const entity = new SutClass(uuid)

    const id = entity.id

    expect(id).toBe(uuid)
    expect(entity.entityId).toBeInstanceOf(Uuid)
  })
})
