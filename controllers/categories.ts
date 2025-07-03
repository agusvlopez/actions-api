import { CategoryModelProps} from "../types.ts"
import { Request, RequestHandler, Response } from "express"

class CategoryController {
  categoryModel: CategoryModelProps["categoryModel"]

  constructor({ categoryModel } : CategoryModelProps){
    this.categoryModel = categoryModel;
  }

  getAll: RequestHandler  = async (req: Request, res: Response) => {
    try {
        const categories = await this.categoryModel.getAll()
        res.json(categories)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching categories'
      res.status(500).json({ error: errorMessage })
    }
  }

  getById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const category = await this.categoryModel.getById(id)
      if (!category) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.json(category)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching category'
      res.status(500).json({ error: errorMessage })
    }
  }

  create: RequestHandler = async (req: Request, res: Response) => {
    try {
      const newCategory = await this.categoryModel.create(req.body)
      res.status(201).json(newCategory)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error creating category'
      res.status(500).json({ error: errorMessage })
    }
  }

  update: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const updatedCategory = await this.categoryModel.update(id, req.body)
      if (!updatedCategory) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.status(200).json(updatedCategory)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error updating category'
      res.status(500).json({ error: errorMessage })
    }
  }

  delete: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedCategory = await this.categoryModel.delete(id)
      if (!deletedCategory) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.json({ message: `Category '${deletedCategory.name}' deleted successfully` })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error deleting category'
      res.status(500).json({ error: errorMessage })
    }
  }
}

export default CategoryController