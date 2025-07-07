import { Router } from "express"
import ActionController from "@/controllers/actions.ts"
import { ActionModelProps } from "@/types/common.ts"

export const createActionsRouter = (actionModel : ActionModelProps) => {
  const actionsRouter = Router()

  const actionController = new ActionController(actionModel)

  actionsRouter.get('/', actionController.getAll)
  actionsRouter.get('/:id', actionController.getById)
  actionsRouter.post('/', actionController.create)
  actionsRouter.put('/:id', actionController.update)
  actionsRouter.delete('/:id', actionController.delete)

  return actionsRouter
}
