import { generateErrorMessage } from '@/@shared/errors/exceptions/generate-error-message'
import { Entity } from '../entity'
import { ValueObject } from '../value-object'
import { IRepository } from './repository-interface'
import {
  DefaultDatabaseErrorCode,
  databaseDictionaryErrors,
} from '@/@shared/errors/dictionary/default-datatabase-errors'

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject,
> implements IRepository<E, EntityId>
{
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities)
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entity.entityId),
    )

    if (indexFound === -1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
        {},
        'in-memory-repository',
      )
    }

    this.items[indexFound] = entity
  }

  async delete(entityId: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entityId),
    )

    if (indexFound === -1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
        {},
        'in-memory-repository',
      )
    }

    this.items.splice(indexFound, 1)
  }

  async findById(entityId: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entityId.equals(entityId))
    return typeof item === 'undefined' ? null : item
  }

  async findAll(): Promise<any> {
    return this.items
  }

  abstract getEntity(): new (...args: any[]) => E
}
