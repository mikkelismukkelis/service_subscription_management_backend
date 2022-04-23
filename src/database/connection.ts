import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
} as sql.config

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings)
    return pool
  } catch (error) {
    console.error(error)
    return new Error()
  }
}
