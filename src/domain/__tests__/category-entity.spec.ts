import { Category, CategoryId } from '../category-entity'

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'movie',
      })

      expect(category.categoryId).toBeInstanceOf(CategoryId)
      expect(category.name).toBe('movie')
      expect(category.description).toBeNull()
      expect(category.activate).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with all fields', () => {
      const createdAt = new Date()
      const category = new Category({
        name: 'movie',
        description: 'some description',
        isActive: false,
        createdAt,
      })

      expect(category.categoryId).toBeInstanceOf(CategoryId)
      expect(category.name).toBe('movie')
      expect(category.description).toBe('some description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })
  })

  describe('create command', () => {
    it('should create a category with default values', () => {
      const category = Category.create({
        name: 'movie',
      })

      expect(category.categoryId).toBeInstanceOf(CategoryId)
      expect(category.name).toBe('movie')
      expect(category.description).toBeNull()
      expect(category.activate).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with all fields', () => {
      const createdAt = new Date()
      const category = Category.create({
        name: 'movie',
        description: 'some description',
        isActive: false,
        createdAt,
      })

      expect(category.categoryId).toBeInstanceOf(CategoryId)
      expect(category.name).toBe('movie')
      expect(category.description).toBe('some description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })
  })

  describe('categoryId field', () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: new CategoryId() },
    ]

    test.each(arrange)('when categoryId is $categoryId', ({ categoryId }) => {
      const category = new Category(
        {
          name: 'movie',
        },
        categoryId as any,
      )

      expect(category.categoryId).toBeInstanceOf(CategoryId)
      if (categoryId instanceof CategoryId) {
        expect(category.categoryId).toBe(categoryId)
      }
    })
  })

  it('should change name', () => {
    const category = new Category({
      name: 'Movie',
    })

    category.changeName('other movie')
    expect(category.name).toBe('other movie')
  })

  it('should change description', () => {
    const category = new Category({
      name: 'Movie',
      description: 'some description',
    })

    category.changeDescription('other description')
    expect(category.description).toBe('other description')
  })

  it('should activate a category', () => {
    const category = new Category({
      name: 'Movie',
      isActive: false,
    })

    category.activate()
    expect(category.isActive).toBeTruthy()
  })

  it('should deactivate a category', () => {
    const category = new Category({
      name: 'Movie',
      isActive: true,
    })

    category.deactivate()
    expect(category.isActive).toBeFalsy()
  })
})
