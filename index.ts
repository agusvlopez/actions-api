import express from 'express'
import cors from 'cors'
import { connectDB } from './databases/mongodb.ts'
import 'dotenv/config'
import { createActionsRouter } from './routes/actions.ts'
import { ActionModelProps } from './types.ts'

export const createApp = async ( { actionModel } : ActionModelProps ) => {
  const app = express()
  app.use(express.json())
  app.disable('x-powered-by')
  app.use(cors()) //todo: change the parameter

  app.use('/actions', createActionsRouter({ actionModel }))

  return app
}