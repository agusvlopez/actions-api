import mongoose from 'mongoose'
import { Action as ActionType } from '../../types.js'

const ActionSchema = new mongoose.Schema<ActionType>({
  title: {
    type: String,
    required: true
  },
  description: String,
  carbon: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['energía', 'transporte', 'reciclaje', 'alimentación', 'agua', 'otros'],
    required: true
  }
}, { timestamps: true })

const ActionModel = mongoose.model<ActionType>('Action', ActionSchema)

export default ActionModel
