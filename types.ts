import { Document, Model } from 'mongoose'

/**
 * Represents an action a user can take to reduce their carbon footprint.
 */
export interface Action extends Document {
  title: string
  description?: string
  carbon: number     
  category: string   
}

/**
 * Action Model from mongoose
 */
export interface ActionModelProps {
  actionModel: Model<Action>;
}

export type DbUri = string 

export interface CreateAppParams extends ActionModelProps {
  dbUri: DbUri
}