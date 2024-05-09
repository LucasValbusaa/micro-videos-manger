import { Entity } from '@/@shared/domain/entity'
import { Uuid } from '@/@shared/domain/value-objects/uuid-vo'
import { Notification } from '@/@shared/domain/validators/notification'
import { CategoryValidatorFactory } from './category-validator'

export type CategoryConstructorProps = {
  name: string
  description?: string | null
  isActive?: boolean
  createdAt?: Date
}

export type CategoryFieldsValidate =
  | 'name'
  | 'description'
  | 'isActive'
  | 'createdAt'

export class CategoryId extends Uuid {}

export class Category extends Entity {
  private _categoryId: CategoryId
  private props: CategoryConstructorProps
  public notification: Notification

  constructor(props: CategoryConstructorProps, id?: CategoryId) {
    super()
    this.props = props
    this._categoryId = id ?? new CategoryId()
    this.props.description = props.description ?? null
    this.props.isActive = props.isActive ?? true
    this.props.createdAt = props.createdAt ?? new Date()
    this.notification = new Notification()
  }

  static create(props: CategoryConstructorProps, id?: CategoryId) {
    return new Category(props, id)
  }

  get entityId() {
    return this._categoryId
  }

  get categoryId() {
    return this._categoryId.id
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get isActive() {
    return this.props.isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  changeName(name: string): void {
    this.props.name = name
  }

  changeDescription(description: string): void {
    this.props.description = description
  }

  activate() {
    this.props.isActive = true
  }

  deactivate() {
    this.props.isActive = false
  }

  validate(fields?: CategoryFieldsValidate[]) {
    const validator = CategoryValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  toJSON() {
    return {
      categoryId: this._categoryId.id,
      name: this.props.name,
      description: this.props.description,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
    }
  }
}
