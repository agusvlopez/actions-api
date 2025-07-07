import mysql from 'mysql2/promise'
import { Action as ActionType } from '../../types/common.ts'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.DATABASE_PASSWORD,
  database: 'greenSteps'
}

const connection = await mysql.createConnection(config)

class ActionModel {
  static async getAll(category?: string) {   
    //filter actions by category if provided
    if (category) {
        const lowerCaseCategory = category?.toLowerCase()

        const [filteredActions] = await connection.query(
          `SELECT 
            actions.title, 
            actions.description, 
            actions.carbon,
            BIN_TO_UUID(actions.id) as id, 
            categories.name AS category_name
          FROM actions 
          JOIN categories ON actions.category_id = categories.id
          WHERE categories.name = ?;`,
          [lowerCaseCategory]
        )

        return filteredActions
    }

    // If no category filter is applied, return all actions
    const [actions] = await connection.query(
      `SELECT 
        title, 
        description, 
        carbon, 
        BIN_TO_UUID(category_id) AS category_id, 
        BIN_TO_UUID(id) as id 
      FROM actions;`
    )

    // Return all actions if no category filter is applied
    return actions
  }

  static async getById(id: string) {
    const [actions] = await connection.query<any[]>(
      `SELECT 
        title, 
        description, 
        carbon, 
        BIN_TO_UUID(category_id) AS category_id, 
        BIN_TO_UUID(id) AS id 
      FROM actions 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (actions.length === 0) return []
    return actions[0]
  }

  static async create(action: ActionType) {
    const { title, description, carbon, categoryId } = action

    const [uuidResult]: any = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO actions (title, description, carbon, category_id, id)
        VALUES (?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?));`,
        [title, description, carbon, categoryId, uuid]
      )
      
    } catch (error) {
      throw new Error('Action creation failed')
    }

    const [actions] = await connection.query<any[]>(
      `SELECT 
        title, 
        description, 
        carbon, 
        BIN_TO_UUID(category_id) AS category_id, 
        BIN_TO_UUID(id) AS id 
      FROM actions 
      WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    
    if (actions.length === 0) return []

    return actions[0]
  }

  static async update(id: string, input: ActionType) {
    try {
      const [existingAction] = await connection.query<any[]>(
        `SELECT 
          title, 
          description, 
          carbon,
          BIN_TO_UUID(category_id) AS categoryId
        FROM actions WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
      
      if (existingAction.length === 0) {
        throw new Error('Action not found')
      }

      const currentAction = existingAction[0]

      const action = {
        ...currentAction,
        ...input
      }

      const { title, description, carbon, categoryId } = action

      await connection.query(`
        UPDATE actions
        SET 
          title = ?,
          description = ?,
          carbon = ?,
          category_id = UUID_TO_BIN(?)
        WHERE 
          id = UUID_TO_BIN(?);`,
        [title, description, carbon, categoryId, id]
      )

      return action
    }
    catch (error) {
      throw new Error('Action update failed')
    }
  }

  static async delete(id: string) {
    try {
      //select the action to return it after deletion
      const [existingAction] = await connection.query<any[]>(
        `SELECT 
          title, 
          description, 
          carbon, 
          BIN_TO_UUID(category_id) AS categoryId, 
          BIN_TO_UUID(id) AS id
        FROM actions
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      if (existingAction.length === 0) {
        throw new Error('Action not found')
      }

      const action = existingAction[0]

      const [result] = await connection.query<mysql.ResultSetHeader>(
        `DELETE FROM actions 
        WHERE 
          id = UUID_TO_BIN(?);`,
        [id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Action not found')
      }
      // Return the deleted action
      return action

    } catch (error) {
      throw new Error('Action delete failed')
    }
  }
}

export default ActionModel