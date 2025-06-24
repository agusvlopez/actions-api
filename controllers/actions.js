import ActionModel from "../models/action.js"

class ActionController {
  static async getAll(req, res) {
    const actions = await ActionModel.getAll()
    if(!actions) res.status(404).json({ error: 'Actions not found' })
    res.json(actions)
  }

  static async getById(req, res) {
    const { id } = req.params
    const action = await ActionModel.getById(id)
    
    if(!action) {
      res.status(404).json({ error: 'Action not found' })
    } else {
      res.json(action)
    }
  }

  static async create(req, res) {
    const { title, description, carbon, category } = req.body
    const action = await ActionModel.create({ title, description, carbon, category })

    res.status(201).json(action)
  }

  static async update(req, res) {
    const { id } = req.params
    const { title, description, carbon, category } = req.body
    const action = await ActionModel.update(id, { title, description, carbon, category })
    if(!action) {
      res.status(404).json({ error: 'Action not found' }) 
    } else {
      res.status(201).json(action)
    }

  }

  static async delete(req, res) {
    const { id } = req.params
    const action = await ActionModel.delete(id)
    if(!action) {
      res.status(404).json({ error: 'Action not found' })
    } else {
      res.json({ message: `Action '${action?.title}' deleted successfully` })
    }
  }
}

export default ActionController