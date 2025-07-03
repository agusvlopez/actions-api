import mysql from 'mysql2/promise'
import { Category as CategoryType } from '../../types.js'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: process.env.DATABASE_PASSWORD,
  database: 'greenSteps'
}

const connection = await mysql.createConnection(config)

class CategoryModel {
  static async getAll() {
    const [categories] = await connection.query(
      `SELECT 
        BIN_TO_UUID(id) as id, 
        name 
      FROM categories;`
    )
    return categories
  }

  static async getById(id: string) {
    const [categories] = await connection.query<any[]>(
      `SELECT 
        BIN_TO_UUID(id) as id, 
        name 
      FROM categories 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    return categories[0]
  }

  static async create(category: CategoryType) {
    const { name } = category

    const [uuidResult]: any = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      const [result] = await connection.query(
        `INSERT INTO categories (id, name) 
          VALUES (UUID_TO_BIN(?), ?);`,
          [uuid, name]
      )
    } catch (error) {
      throw new Error('Category creation failed')
    }

    const [categories] = await connection.query<any[]>(
      `SELECT 
        BIN_TO_UUID(id) as id, 
        name 
      FROM categories 
      WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    
    if (categories.length === 0) return []

    return categories[0]

  }

  static async update(id: string, input: CategoryType) {
    const [result] = await connection.query<mysql.ResultSetHeader>(
      `UPDATE categories 
       SET name = ? 
       WHERE id = UUID_TO_BIN(?);`,
      [input.name, id]
    )

    if (result.affectedRows === 0) return null

    return { id, ...input }
  }

  static async delete(id: string) {
    try {
      //select the category to return it after deletion
      const [existingCategory] = await connection.query<any[]>(
        `SELECT 
          name, 
          BIN_TO_UUID(id) AS id
        FROM categories
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      if (existingCategory.length === 0) {
        throw new Error('Category not found')
      }

      const category = existingCategory[0]

      const [result] = await connection.query<mysql.ResultSetHeader>(
        `DELETE FROM categories 
        WHERE 
          id = UUID_TO_BIN(?);`,
        [id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Category not found')
      }
      // Return the deleted category
      return category

    } catch (error) {
      throw new Error('Category delete failed')
    }
  }
}

export default CategoryModel