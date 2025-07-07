import mongoose from 'mongoose'
import { MongoAction as ActionType } from '../../types/mongo.ts'
import ActionSchema from '../../schemas/mongodb/action.ts'

const MongooseActionModel = mongoose.model<ActionType>('Action', ActionSchema)

class ActionModel {
  static async getAll(category?: string) {
    const categoryLowerCased = category && category.toLowerCase()
    const filter = category ? { category: categoryLowerCased } : {}
    
    const actions = await MongooseActionModel.find(filter)
    return actions
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
    return MongooseActionModel.findByIdAndDelete(id) 
  }
}

export default ActionModel