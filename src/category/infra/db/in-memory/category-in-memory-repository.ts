import {
  InMemoryRepository,
  InMemorySearchableRepository,
} from '@/@shared/domain/repository/in-memory-repository'
import { SortDirection } from '@/@shared/domain/repository/search-params'
import { Category, CategoryId } from '@/category/domain/category-entity'

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  CategoryId
> {
  sortableFields: string[] = ['name', 'createdAt']

  protected async applyFilter(
    items: Category[],
    filter: string,
  ): Promise<Category[]> {
    if (!filter) {
      return items
    }

    return items.filter((i) => {
      return i.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    })
  }

  getEntity(): new (...args: any[]) => Category {
    return Category
  }

  protected async applySort(
    items: Category[],
    sort: string,
    sortDir: SortDirection,
  ): Promise<Category[]> {
    return sort
      ? super.applySort(items, sort, sortDir)
      : super.applySort(items, 'createdAt', 'desc')
  }
}
