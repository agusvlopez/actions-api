import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import 'dotenv/config'
import Action from './schemas/action.js'
import ActionsRouter from './routes/actions.js'

const app = express()

app.use(express.json())
app.use(cors()) //todo: change the parameter

const PORT = process.env.PORT || 3000

//database
await connectDB()

app.use('/actions', ActionsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})