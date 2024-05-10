import { generateErrorMessage } from '@/@shared/errors/handles/generate-error-message'
import { Entity } from '../entity'
import { ValueObject } from '../value-objects/value-object'
import { IRepository, ISearchableRepository } from './repository-interface'
import {
  DefaultDatabaseErrorsCode,
  defaultDatabaseErrors,
} from '@/@shared/errors/dictionary/default-database-errors'
import { SearchParams, SortDirection } from './search-params'
import { SearchResult } from './search-result'

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
        DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
        defaultDatabaseErrors,
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
        DefaultDatabaseErrorsCode.DB_NOT_FOUND_SCHEMA,
        defaultDatabaseErrors,
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

export abstract class InMemorySearchableRepository<
    E extends Entity,
    EntityId extends ValueObject,
    Filter = string,
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  sortableFields: string[] = []
  async search(props: SearchParams<Filter>): Promise<SearchResult<Entity>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDir,
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.perPage,
    )

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
    })
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null,
  ): Promise<E[]>

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ) {
    const start = (page - 1) * perPage // 1 * 15 = 15
    const limit = start + perPage // 15 + 15 = 30
    return items.slice(start, limit)
  }

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: SortDirection | null,
    customGetter?: (sort: string, item: E) => any,
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }

    return [...items].sort((a, b) => {
      const aValue = customGetter ? customGetter(sort, a) : a[sort]
      const bValue = customGetter ? customGetter(sort, b) : b[sort]
      if (aValue < bValue) {
        return sortDir === 'asc' ? -1 : 1
      }

      if (aValue > bValue) {
        return sortDir === 'asc' ? 1 : -1
      }

      return 0
    })
  }
}
