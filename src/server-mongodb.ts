import { PORT } from "@/config.ts"
import { createApp } from "@/index.ts"
import ActionModel from "@/models/mongodb/action.ts"

import '@/config/MongoDbClient.ts'

const app = await createApp(ActionModel)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})