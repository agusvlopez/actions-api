import { Router } from "express"
import ActionController from "../controllers/actions.js"
import { CategoryModelProps } from "../types.js"
import CategoryController from "../controllers/categories.js"

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
