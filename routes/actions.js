import { Router } from "express";
import ActionController from "../controllers/actions.js";

const ActionsRouter = Router()

ActionsRouter.get('/', ActionController.getAll)
ActionsRouter.get('/:id', ActionController.getById)
ActionsRouter.post('/', ActionController.create)
ActionsRouter.put('/:id', ActionController.update)
ActionsRouter.delete('/:id', ActionController.delete)

export default ActionsRouter