import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI ?? '', {
  dbName: 'greenSteps'
})
 .then(() => {
   console.log('✅ MongoDB Atlas conectado')
  })
  .catch((error) => {
    console.error('❌ Error al conectar con MongoDB Atlas', error)
  })
