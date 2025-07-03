import { Router } from "express"
import ActionController from "../controllers/actions.js"
import { ActionModelProps } from "../types.js"

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
