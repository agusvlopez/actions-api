import { Model } from "mongoose";
import { ActionModelProps, Action as ActionType} from "../types.ts";
import { Request, RequestHandler, Response } from "express";

class ActionController {
  actionModel: ActionModelProps["actionModel"];

  constructor({ actionModel }: ActionModelProps){
    this.actionModel = actionModel;
  }

  getAll: RequestHandler  = async (req: Request, res: Response) => {
    try {
      const actions = await this.actionModel.getAll()
      res.json(actions)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching actions'
      res.status(500).json({ error: errorMessage })
    }
  }

  getById: RequestHandler = async (req, res) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.getById(id)
      if (!action) {
        res.status(404).json({ error: 'Action not found' })
      } else {
        res.json(action)
      }
    } catch (err) {
      // Handle CastError for invalid ID format
      if (err instanceof Error && err.name === 'CastError') {
        res.status(400).json({ error: 'Invalid ID format' })
      } else {
        // Handle other unexpected errors
        const errorMessage = err instanceof Error ? err.message : 'Unknown error fetching action by ID'
        res.status(500).json({ error: errorMessage })
      }
    }
  }


  create: RequestHandler = async (req: Request, res: Response) => {
    try {
      const newAction = await this.actionModel.create(req.body)
      res.status(201).json(newAction)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error creating action'

      // Handle ValidationError for invalid request body
      if (err instanceof Error && err.name === 'ValidationError') {
        res.status(400).json({ error: errorMessage })
      } else {
        // Handle other unexpected errors
        res.status(500).json({ error: errorMessage })
      }
    }
  }

  update: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.update(id, req.body)
      if(!action) {
        res.status(404).json({ error: 'Action not found' }) 
      } else {
        res.status(200).json(action)
      }
    } catch (err) {
      // Handle CastError for invalid ID format
      if (err instanceof Error && err.name === 'CastError') {
        res.status(400).json({ error: 'Invalid ID format' })
        return 
      } else {
        // Handle other unexpected errors
        const errorMessage = err instanceof Error ? err.message : 'Unknown error updating action'
        res.status(500).json({ error: errorMessage })
        return
      }
    }
  }

  delete: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const action = await this.actionModel.delete(id)
      if(!action) {
        res.status(404).json({ error: 'Action not found' })
      } else {
        res.json({ message: `Action '${action.title}' deleted successfully` })
      }
    } catch (err) {
      // Handle CastError for invalid ID format
      if (err instanceof Error && err.name === 'CastError') {
        res.status(400).json({ error: 'Invalid ID format' })
      } else {
        // Handle other unexpected errors
        const errorMessage = err instanceof Error ? err.message : 'Unknown error deleting action';
        res.status(500).json({ error: errorMessage })
      }
    }
  }
}

export default ActionController