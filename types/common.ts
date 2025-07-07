import { QueryResult } from "mysql2"

/**
 * Represents an action a user can take to reduce their carbon footprint.
 */
export interface Action {
  title: string
  description?: string
  carbon: number
}

/**
 * Represents a category of actions.
 */
export interface Category {
  name: string
}

//TODO: CHECK if there is a better way to define this:
/**
 * Action Model interface for database operations.
 * This interface defines the methods available for interacting with the Action model.
 */
export interface ActionModelProps {
  actionModel: {
    getAll(category?: string): Promise<QueryResult | Action[]>
    getById(id: string): Promise<Action | null>
    create(action: Action): Promise<Action | any[]>
    update(id: string, input: Action): Promise<Action | null>
    delete(id: string): Promise<Action | null>
  }
}

/**
 * Category Model interface for database operations.
 * This interface defines the methods available for interacting with the Category model.
*/
export interface CategoryModelProps {
  categoryModel: {
    getAll(): Promise<QueryResult | Category[]>
    getById(id: string): Promise<Category | null>
    create(category: Category): Promise<Category>
    update(id: string, input: Category): Promise<Category | null>
    delete(id: string): Promise<Category | null>
  }
}