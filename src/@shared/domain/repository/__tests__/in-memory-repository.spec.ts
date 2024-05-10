import { DefaultDatabaseErrorsCode } from '@/@shared/errors/dictionary/default-database-errors'
import { Entity } from '../../entity'
import { Notification } from '../../validators/notification'
import { ValueObject } from '../../value-objects/value-object'
import { Uuid } from '../../value-objects/uuid-vo'
import { InMemoryRepository } from '../in-memory-repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity {
  notification: Notification
  entityId: Uuid
  name: string
  price: number

  constructor(props: StubEntityProps, id?: Uuid) {
    super()
    this.entityId = id || new Uuid()
    this.name = props.name
    this.price = props.price
  }

  toJSON() {
    return {
      entityId: this.entityId.id,
      name: this.name,
      price: this.price,
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository

  beforeEach(() => {
    repo = new StubInMemoryRepository()
  })

  it('should insert a new entity', async () => {
    const entityId = new Uuid()
    const entity = new StubEntity(
      {
        name: 'Stub',
        price: 100,
      },
      entityId,
    )

    await repo.insert(entity)

    expect(repo.items).toHaveLength(1)
    expect(repo.items[0].entityId).toEqual(entityId)
    expect(repo.items[0].name).toEqual('Stub')
    expect(repo.items[0].price).toEqual(100)
  })

  it('should bulk insert entities', async () => {
    const entityId1 = new Uuid()
    const entityId2 = new Uuid()

    const entities = [
      new StubEntity(
        {
          name: 'Stub_1',
          price: 100,
        },
        entityId1,
      ),
      new StubEntity(
        {
          name: 'Stub_2',
          price: 200,
        },
        entityId2,
      ),
    ]

    await repo.bulkInsert(entities)

    expect(repo.items).toHaveLength(2)
    expect(repo.items[0].entityId).toEqual(entityId1)
    expect(repo.items[0].name).toEqual('Stub_1')
    expect(repo.items[0].price).toEqual(100)
    expect(repo.items[1].entityId).toEqual(entityId2)
    expect(repo.items[1].name).toEqual('Stub_2')
    expect(repo.items[1].price).toEqual(200)
  })

  describe('update method', () => {
    it('should throw a erro when entity not found', async () => {
      try {
        const entityId = new Uuid()
        const entity = new StubEntity(
          {
            name: 'Stub',
            price: 100,
          },
          entityId,
        )

        await repo.update(entity)
      } catch (error) {
        expect(error.errorObject).toStrictEqual({
          status: '404',
          statusCode: 404,
          code: DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
          title: 'Schema not found',
          detail: 'The schema requested was not found.',
          source: {
            path: 'in-memory-repository',
          },
          meta: {
            reason: 'The schema requested was not found.',
          },
          action: 'Check the data or id provided',
          children: [],
          resolution: undefined,
        })
      }
    })

    it('should update a entity', async () => {
      const entityId = new Uuid()
      const entity = new StubEntity(
        {
          name: 'Stub',
          price: 100,
        },
        entityId,
      )

      repo.items = [entity]

      const updatedEntity = new StubEntity(
        {
          name: 'Stub Updated',
          price: 200,
        },
        entityId,
      )

      await repo.update(updatedEntity)

      expect(repo.items).toHaveLength(1)
      expect(repo.items[0].entityId).toEqual(entityId)
      expect(repo.items[0].name).toEqual('Stub Updated')
      expect(repo.items[0].price).toEqual(200)
    })
  })

  describe('delete command', () => {
    it('should throw a erro when entity not found', async () => {
      try {
        const entityId = new Uuid()
        await repo.delete(entityId)
      } catch (error) {
        expect(error.errorObject).toStrictEqual({
          status: '404',
          statusCode: 404,
          code: DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
          title: 'Schema not found',
          detail: 'The schema requested was not found.',
          source: {
            path: 'in-memory-repository',
          },
          meta: {
            reason: 'The schema requested was not found.',
          },
          action: 'Check the data or id provided',
          children: [],
          resolution: undefined,
        })
      }
    })

    it('should delete a entity', async () => {
      const entityId = new Uuid()
      const entity = new StubEntity(
        {
          name: 'Stub',
          price: 100,
        },
        entityId,
      )

      repo.items = [entity]

      await repo.delete(entityId)
    })
  })

  describe('findById method', () => {
    it('should throw a erro when entity not found', async () => {
      try {
        const entityId = new Uuid()
        await repo.findById(entityId)
      } catch (error) {
        expect(error.errorObject).toStrictEqual({
          status: '404',
          statusCode: 404,
          code: DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
          title: 'Schema not found',
          detail: 'The schema requested was not found.',
          source: {
            path: 'in-memory-repository',
          },
          meta: {
            reason: 'The schema requested was not found.',
          },
          action: 'Check the data or id provided',
          children: [],
          resolution: undefined,
        })
      }
    })

    it('should find a entity by id', async () => {
      const entityId = new Uuid()
      const entity = new StubEntity(
        {
          name: 'Stub',
          price: 100,
        },
        entityId,
      )

      repo.items = [entity]

      const foundEntity = await repo.findById(entityId)

      expect(foundEntity).toEqual(entity)
    })
  })

  it('should return all entities', async () => {
    const entityId1 = new Uuid()
    const entityId2 = new Uuid()

    const entities = [
      new StubEntity(
        {
          name: 'Stub_1',
          price: 100,
        },
        entityId1,
      ),
      new StubEntity(
        {
          name: 'Stub_2',
          price: 200,
        },
        entityId2,
      ),
    ]

    repo.items = entities

    const foundEntities = await repo.findAll()

    expect(foundEntities).toEqual(entities)
  })

  it('should return the entity class', () => {
    const entityClass = repo.getEntity()

    expect(entityClass).toEqual(StubEntity)
  })
})
