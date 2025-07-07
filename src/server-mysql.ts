import { PORT } from "@/config.js"
import { createApp } from "@/index.ts"
import ActionModel from "@/models/mysql/action.ts"
import CategoryModel from "@/models/mysql/category.ts"

const app = await createApp(ActionModel, CategoryModel)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})