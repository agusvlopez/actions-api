import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000
export const MONGO_URI = process.env.MONGO_URI ?? ''

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set.')
}

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET ?? ''
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY ?? ''
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? ''