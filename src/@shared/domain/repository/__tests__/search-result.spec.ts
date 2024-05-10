import { Entity } from '../../entity'
import { Notification } from '../../validators/notification'
import { Uuid } from '../../value-objects/uuid-vo'
import { SearchResult } from '../search-result'

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

describe('Search Result Unit Tests', () => {
  test('constructor props', () => {
    let result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
    })

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    })

    result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
    })

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    })
  })

  it('should set lastPage = 1 when perPage field is greater than total field', () => {
    const result = new SearchResult({
      items: [] as any,
      total: 4,
      currentPage: 1,
      perPage: 15,
    })

    expect(result.lastPage).toBe(1)
  })

  test('lastPage prop when total is not a multiple of perPage', () => {
    const result = new SearchResult({
      items: [] as any,
      total: 101,
      currentPage: 1,
      perPage: 20,
    })

    expect(result.lastPage).toBe(6)
  })

  it('should create a new Search Result instance with required fields', () => {
    const sut = new SearchResult({
      items: [],
      total: 0,
      currentPage: 1,
      perPage: 15,
    })

    expect(sut.items).toStrictEqual([])
    expect(sut.total).toBe(0)
    expect(sut.currentPage).toBe(1)
    expect(sut.perPage).toBe(15)
    expect(sut.lastPage).toBe(0)
  })

  it('should create a new Search Result instance with all fields', () => {
    const entity = new SutClass(new Uuid())
    const sut = new SearchResult<SutClass>({
      items: [entity],
      total: 0,
      currentPage: 1,
      perPage: 15,
    })

    expect(sut.items).toStrictEqual([entity])
    expect(sut.total).toBe(0)
    expect(sut.currentPage).toBe(1)
    expect(sut.perPage).toBe(15)
    expect(sut.lastPage).toBe(0)
  })

  describe('toJSON method', () => {
    test('white force false', () => {
      const entity = new SutClass(new Uuid())
      const sut = new SearchResult<SutClass>({
        items: [entity],
        total: 0,
        currentPage: 1,
        perPage: 15,
      })

      const json = sut.toJSON()

      expect(json).toStrictEqual({
        items: [entity],
        total: 0,
        currentPage: 1,
        perPage: 15,
        lastPage: 0,
      })
    })

    test('white force true', () => {
      const entity = new SutClass(new Uuid())
      const sut = new SearchResult<SutClass>({
        items: [entity],
        total: 0,
        currentPage: 1,
        perPage: 15,
      })

      const json = sut.toJSON(true)

      expect(json).toStrictEqual({
        items: [entity.toJSON()],
        total: 0,
        currentPage: 1,
        perPage: 15,
        lastPage: 0,
      })
    })
  })
})
