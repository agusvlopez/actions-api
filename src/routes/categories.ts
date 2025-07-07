import { Router } from "express"
import { CategoryModelProps } from "@/types/common.ts"
import CategoryController from "@/controllers/categories.ts"

export const createCategoriesRouter = (categoryModel : CategoryModelProps) => {
  const categoriesRouter = Router()

  const categoryController = new CategoryController(categoryModel)

  categoriesRouter.get('/', categoryController.getAll)
  categoriesRouter.get('/:id', categoryController.getById)
  categoriesRouter.post('/', categoryController.create)
  categoriesRouter.put('/:id', categoryController.update)
  categoriesRouter.delete('/:id', categoryController.delete)

  return categoriesRouter
}
