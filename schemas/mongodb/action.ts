import mongoose from "mongoose";
import { MongoAction as ActionType } from '../../types/mongo.ts'

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

export default ActionSchema
