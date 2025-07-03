import { QueryResult } from "mysql2"

/**
 * Represents an action a user can take to reduce their carbon footprint.
 */
export interface Action {
  title: string
  description?: string
  carbon: number     
  category: string   
}

/**
 * Represents a category of actions.
 */
export interface Category {
  name: string
}

/**
 * Action Model interface for database operations.
 * This interface defines the methods available for interacting with the Action model.
 */
export interface ActionModelProps {
  actionModel: {
    getAll(category?: string): Promise<QueryResult>
    getById(id: string): Promise<Action | null>
    create(action: Action): Promise<Action>
    update(id: string, input: Action): Promise<Action | null>
    delete(id: string): Promise<Action | null>
  }
}

export interface CategoryModelProps {
  categoryModel: {
    getAll(): Promise<QueryResult>
    getById(id: string): Promise<Category | null>
    create(category: Category): Promise<Category>
    update(id: string, input: Category): Promise<Category | null>
    delete(id: string): Promise<Category | null>
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