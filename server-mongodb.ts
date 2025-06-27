import { MONGO_URI, PORT } from "./config.ts"
import { createApp } from "./index.ts"
import ActionModel from "./models/mongodb/action.ts"

const app = await createApp({ actionModel: ActionModel, dbUri: MONGO_URI })

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})