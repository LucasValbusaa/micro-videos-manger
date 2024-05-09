import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { Category, CategoryFieldsValidate } from './category-entity'
import { ClassValidatorFields } from '@/@shared/domain/validators/class-validator-fields'
import { Notification } from '@/@shared/domain/validators/notification'

class CategoryRules {
  @MaxLength(255, { groups: ['name'] })
  @IsString({ groups: ['name'] })
  @IsNotEmpty({ groups: ['name'] })
  name: string

  @IsString({ groups: ['description'] })
  @IsOptional({ groups: ['description'] })
  description?: string

  @IsBoolean({ groups: ['isActive'] })
  @IsOptional({ groups: ['isActive'] })
  isActive?: boolean

  @IsDateString({}, { groups: ['createdAt'] })
  @IsString({ groups: ['createdAt'] })
  @IsOptional({ groups: ['createdAt'] })
  createdAt?: Date

  constructor(aggregate: Category) {
    Object.assign(this, aggregate.toJSON())
  }
}

class CategoryValidator extends ClassValidatorFields {
  validate(
    notification: Notification,
    data: Category,
    fields?: CategoryFieldsValidate[],
  ): boolean {
    const fieldsToValidate = ['name', 'description', 'isActive', 'createdAt']
    const newFields = fields?.length ? fields : fieldsToValidate
    return super.validate(notification, new CategoryRules(data), newFields)
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator()
  }
}
