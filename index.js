import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import 'dotenv/config'
import Action from './schemas/action.js'

const app = express()

app.use(express.json())
app.use(cors()) //todo: change the parameter

const PORT = process.env.PORT || 3000

//database
await connectDB()

//routes
app.post('/actions', async (req, res) => {
  try {
    const action = await Action(req.body);
    await action.save();
    res.status(201).json(action);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/actions', async (req, res) => {
  try {
    const actions = await Action.find()
    res.json(actions)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/actions/:id', async (req, res) => {
  const { id } = req.params
  try {
    const action = await Action.findById(id)
    if(action) {
      res.json(action)
    } else {
      res.status(404).json({ error: 'Action not found' })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.put('/actions/:id', async (req, res) => {
  const { id } = req.params
  console.log(req.body);
  
  try {
    const action = await Action.findByIdAndUpdate(id, req.body)
     console.log("id", id);
    console.log("action", action);
    
    if(!action) {
      res.status(404).json({ error: 'Action not found' })
    } else {
      res.status(201).json({ message: `Action updated` })
    }
    
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.delete('/actions/:id', async (req, res) => {
  const { id } = req.params
  try {
    const action = await Action.findByIdAndDelete(id)
    if(action) {
      res.json({ message: `Action '${action.title}' deleted successfully` })
    } else {
      res.status(404).json({ error: 'Action not found' })
    }
  } catch (error) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})