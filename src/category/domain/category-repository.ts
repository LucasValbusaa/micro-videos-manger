import {
  IRepository,
  ISearchableRepository,
} from '@/@shared/domain/repository/repository-interface'
import { Category, CategoryId } from './category-entity'

export interface ICategoryRepository
  extends ISearchableRepository<Category, CategoryId> {}
