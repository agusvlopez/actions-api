export const PORT = process.env.PORT ?? 3000
export const MONGO_URI = process.env.MONGO_URI ?? ''

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set.')
}