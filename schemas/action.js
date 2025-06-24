import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema({
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
    enum: ['energía', 'transporte', 'reciclaje', 'alimentación', 'agua', 'otros'], // opcional
    required: true
  }
}, { timestamps: true });

const Action = mongoose.model('Action', ActionSchema);

export default Action;
