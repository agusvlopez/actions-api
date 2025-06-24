class ActionController {
  constructor({ actionModel }){
    this.actionModel = actionModel
  }

  getAll = async (req, res) => {
    try {
      const actions = await this.actionModel.find()
      res.json(actions)
    } catch (err) {
      res.status(500).json({ error: 'Error fetching actions' })
    }
  }

  getById = async (req, res) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.findById(id)
      if (!action) {
        return res.status(404).json({ error: 'Action not found' })
      }
      res.json(action)
    } catch (err) {
      // Captura errores de formato de ID inválido (CastError)
      res.status(400).json({ error: 'Invalid ID format or action not found' })
    }
  }

  create = async (req, res) => {
    try {
      const newAction = await this.actionModel.create(req.body)
      res.status(201).json(newAction)
    } catch (err) {
      // Captura errores de validación de Mongoose
      res.status(400).json({ error: err.message })
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.findByIdAndUpdate(id, req.body, { new: true })
      if(!action) return res.status(404).json({ error: 'Action not found' }) 
      res.status(200).json(action)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.findByIdAndDelete(id)
      if(!action) return res.status(404).json({ error: 'Action not found' })
      res.json({ message: `Action '${action.title}' deleted successfully` })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

export default ActionController