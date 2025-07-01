import mongoose from 'mongoose'
import { Action as ActionType } from '../../types.js'
import ActionSchema from '../../schemas/mongodb/action.js'
import { MONGO_URI } from '../../config.ts';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB Atlas conectado')
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB Atlas', error)
  }
}

const MongooseActionModel = mongoose.model<ActionType>('Action', ActionSchema)

class ActionModel {
  static async getAll() {
    //todo: apply filter
    await connectDB()
    return MongooseActionModel.find()
  }

  static async getById(id: string) {
    await connectDB()
    return MongooseActionModel.findById(id)
  }
  
  static async create(action: ActionType) {
    await connectDB()
    return MongooseActionModel.create(action)
  }

  static async update(id: string, action: ActionType) {
    await connectDB()
    return MongooseActionModel.findByIdAndUpdate(id, action, { new: true })
  }
  
  static async delete(id: string) {
    await connectDB()
    const deleted = MongooseActionModel.findByIdAndDelete(id)
    return deleted
  }
}

export default ActionModel