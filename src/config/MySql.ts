import { ConnectionOptions } from "mysql2"

export const mySqlConfig: ConnectionOptions = {
  host: process.env.MYSQL_DATABASE_HOST,
  user: process.env.MYSQL_DATABASE_USER,
  port: parseInt(process.env.MYSQL_DATABASE_PORT || '3306', 10),
  password: process.env.MYSQL_DATABASE_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME
}