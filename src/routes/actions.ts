import { Router } from "express"
import ActionController from "@/controllers/actions.ts"
import { ActionModelProps } from "@/types/common.ts"
import upload from "@/middlewares/multer.ts"

export const createActionsRouter = (actionModel : ActionModelProps) => {
  const actionsRouter = Router()

  const actionController = new ActionController(actionModel)

  actionsRouter.get('/', actionController.getAll)
  actionsRouter.get('/:id', actionController.getById)
  actionsRouter.post('/', upload.single("image"), actionController.create)
  actionsRouter.put('/:id', upload.single("image"), actionController.update)
  actionsRouter.delete('/:id', actionController.delete)

  return actionsRouter
}
