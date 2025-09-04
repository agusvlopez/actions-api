import { ActionModelProps} from "@/types/common.ts"
import { uploadImageToCloudinary } from "@/utils/cloudinary.ts";
import { NextFunction, Request, RequestHandler, Response } from "express"


class ActionController {
  actionModel: ActionModelProps["actionModel"]

  constructor({ actionModel }: ActionModelProps){
    this.actionModel = actionModel;
  }

  getAll: RequestHandler  = async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.query as { category?: string }
    try {
      const actions = await this.actionModel.getAll(category)
      res.json(actions)
    } catch (err) {
      next(err)
    }
  }

  getById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.getById(id)
      if (!action) {
        res.status(404).json({ error: 'Action not found' })
      } else {
        res.json(action)
      }
    } catch (err) {
      next(err)
    }
  }

  create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      //subir a cloudinary
      const image = await uploadImageToCloudinary(req.file.buffer);
      const actionData = {
        ...req.body,
        image
      }
      const newAction = await this.actionModel.create(actionData)
      res.status(201).json(newAction);
    } catch (err) {     
      next(err);
    }
  }

  update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.update(id, req.body)
      if(!action) {
        res.status(404).json({ error: 'Action not found' }) 
      } else {
        res.status(200).json(action)
      }
    } catch (err) {
      next(err)
    }
  }

  delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const deletedAction = await this.actionModel.delete(id)
      if(!deletedAction) {
        res.status(404).json({ error: 'Action not found' })
      } else {
        res.json({ message: `Action '${deletedAction.title}' deleted successfully` })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default ActionController