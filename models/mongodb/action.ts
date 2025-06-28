import mongoose from 'mongoose'
import { Action as ActionType } from '../../types.js'
import ActionSchema from '../../schemas/mongodb/action.js'

const MongooseActionModel = mongoose.model<ActionType>('Action', ActionSchema)

class ActionModel {
  static async getAll() {
    return MongooseActionModel.find()
  }

  static async getById(id: string) {
    return MongooseActionModel.findById(id)
  }
  
  static async create(action: ActionType) {
    return MongooseActionModel.create(action)
  }

  static async update(id: string, action: ActionType) {
    return MongooseActionModel.findByIdAndUpdate(id, action, { new: true })
  }
  
  static async delete(id: string) {
    const deleted = MongooseActionModel.findByIdAndDelete(id)
    return deleted
  }
}

export default ActionModel