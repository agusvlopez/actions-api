import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import 'dotenv/config'
import { createActionsRouter } from './routes/actions.js'

export const createApp = async ({ actionModel }) => {
  const app = express()
  app.use(express.json())
  app.disable('x-powered-by')
  app.use(cors()) //todo: change the parameter

  const PORT = process.env.PORT || 3000

  //database
  await connectDB()

  app.use('/actions', createActionsRouter({ actionModel }))

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}