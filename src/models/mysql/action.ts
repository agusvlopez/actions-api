/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise'
import { SqlAction as ActionType } from '@/types/sql.ts'
import { mySqlConfig } from '@/config/MySql.ts'

const connection = await mysql.createConnection(mySqlConfig)

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

    // Validate required fields (TODO: consider using a validation library)
    if (!title || !carbon || !categoryId) {
      throw new Error('Title, carbon, and categoryId are required')
    }

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult as { uuid: string }[]

 
    await connection.query(
      `INSERT INTO actions (title, description, carbon, category_id, id)
      VALUES (?, ?, ?, UUID_TO_BIN(?), UUID_TO_BIN(?));`,
      [title, description, carbon, categoryId, uuid]
    )  

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
    
    if (actions.length === 0) {
      throw new Error('Could not retrieve the action after creation.')
    }

    return actions[0]
  }

  static async update(id: string, input: ActionType) {
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

  static async delete(id: string) {

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
  }
}

export default ActionModel