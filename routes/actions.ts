import { Router } from "express"
import ActionController from "../controllers/actions.js"
import { ActionModelProps } from "../types.js"

export const createActionsRouter = ({ actionModel }: ActionModelProps) => {
  const ActionsRouter = Router()

  const actionController = new ActionController({ actionModel })

  ActionsRouter.get('/', actionController.getAll)
  ActionsRouter.get('/:id', actionController.getById)
  ActionsRouter.post('/', actionController.create)
  ActionsRouter.put('/:id', actionController.update)
  ActionsRouter.delete('/:id', actionController.delete)

  return ActionsRouter
}
