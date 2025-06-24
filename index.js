import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors()) //todo: change the parameter

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})