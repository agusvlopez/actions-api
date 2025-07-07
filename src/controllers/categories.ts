import { CategoryModelProps} from "@/types/common.ts"
import { NextFunction, Request, RequestHandler, Response } from "express"

class CategoryController {
  categoryModel: CategoryModelProps["categoryModel"]

  constructor({ categoryModel } : CategoryModelProps){
    this.categoryModel = categoryModel;
  }

  getAll: RequestHandler  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await this.categoryModel.getAll()
        res.json(categories)
    } catch (err) {
      next(err)
    }
  }

  getById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const category = await this.categoryModel.getById(id)
      if (!category) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.json(category)
      }
    } catch (err) {
      next(err)
    }
  }

  create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await this.categoryModel.create(req.body)
      res.status(201).json(newCategory)
    } catch (err) {
      next(err)
    }
  }

  update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const updatedCategory = await this.categoryModel.update(id, req.body)
      if (!updatedCategory) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.status(200).json(updatedCategory)
      }
    } catch (err) {
      next(err)
    }
  }

  delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const deletedCategory = await this.categoryModel.delete(id)
      if (!deletedCategory) {
        res.status(404).json({ error: 'Category not found' })
      } else {
        res.json({ message: `Category '${deletedCategory.name}' deleted successfully` })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default CategoryController