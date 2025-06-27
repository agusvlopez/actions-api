import express from 'express'
import cors from 'cors'
import { connectDB } from './db.ts'
import 'dotenv/config'
import { createActionsRouter } from './routes/actions.ts'
import { ActionModelProps, CreateAppParams } from './types.ts'

export const createApp = async ( { actionModel, dbUri } : CreateAppParams ) => {
  const app = express()
  app.use(express.json())
  app.disable('x-powered-by')
  app.use(cors()) //todo: change the parameter

  //database
   if (dbUri) {
    await connectDB({ uri: dbUri })
  }

  app.use('/actions', createActionsRouter({ actionModel }))

  return app
}