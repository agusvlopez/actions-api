import mongoose from 'mongoose'

export const connectDB = async ({ uri }: { uri: string }) => {
  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB Atlas conectado') //TODO: CHANGE THIS TO MAKE IT DYNAMIC
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB Atlas', error)
  }
};
