import { ActionModelProps } from "@/types/common.ts"
import { MongoAction } from "@/types/mongo.ts";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "@/utils/cloudinary.ts";
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
    const actionData = { ...req.body };

    try {
      //TODO: pasarlo a un servicio/archivo aparte
      // Si se sube una nueva imagen
      if (req.file) {
        // 1. Obtener la acción existente para conseguir el public_id de la imagen vieja
        const existingAction = await this.actionModel.getById(id) as MongoAction 
        if (existingAction && existingAction.image && existingAction.image.public_id) {
          // 2. Eliminar la imagen antigua de Cloudinary
          await deleteImageFromCloudinary(existingAction.image.public_id);
        }

        // 3. Subir la nueva imagen
        const newImage = await uploadImageToCloudinary(req.file.buffer);
        actionData.image = newImage;
      }

      // 4. Actualizar la acción en la base de datos
      const updatedAction = await this.actionModel.update(id, actionData);
      if(!updatedAction) {
        res.status(404).json({ error: 'Action not found' }) 
      } else {
        res.status(200).json(updatedAction)
      }
    } catch (err) {
      next(err)
    }
  }

  delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const deletedAction = await this.actionModel.delete(id)
      //eliminar la imagen de cloudinary
      if (deletedAction && deletedAction.image && deletedAction.image.public_id) {
        await deleteImageFromCloudinary(deletedAction.image.public_id);
      }
      
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