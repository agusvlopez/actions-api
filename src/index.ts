import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createActionsRouter } from '@/routes/actions.ts'
import { createCategoriesRouter } from '@/routes/categories.ts'
import { ActionModelProps, CategoryModelProps } from '@/types/common.ts'
import { errorHandler } from '@/middlewares/errorHandler.ts'

export const createApp = async (
  actionModel: ActionModelProps["actionModel"],
  categoryModel?: CategoryModelProps["categoryModel"]
) => {
  const app = express()
  app.use(express.json())
  app.disable('x-powered-by')
  app.use(cors()) //todo: change the parameter

  app.use('/actions', createActionsRouter({ actionModel }))

  if (categoryModel) {
    app.use('/categories', createCategoriesRouter({ categoryModel }))
  }
  
  app.use(errorHandler)

  return app
}