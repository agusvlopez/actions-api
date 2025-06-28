import { Document, Model } from 'mongoose'

/**
 * Represents an action a user can take to reduce their carbon footprint.
 */
export interface Action {
  title: string
  description?: string
  carbon: number     
  category: string   
}

export interface ActionModelProps {
  actionModel: {
    getAll(): Promise<Action[]>
    getById(id: string): Promise<Action | null>
    create(data: any): Promise<Action>
    update(id: string, data: any): Promise<Action | null>
    delete(id: string): Promise<Action | null>
  }
}


// /**
//  * Action Model from mongoose
//  */
// export interface ActionModelProps {
//   actionModel: Model<Action>;
// }

export type DbUri = string 

export interface CreateAppParams extends ActionModelProps {
  dbUri: DbUri
}