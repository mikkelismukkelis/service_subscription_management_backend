import { RequestHandler } from 'express'
import sql from 'mssql'

import { getConnection } from '../database/connection'
import { subscriptionQuerys } from '../database/querys'

// SUBSCRIBE
export const subscribe: RequestHandler = async (req, res, _next) => {
  const email: string = req.body.email
  if (!email) {
    return res
      .status(500)
      .send({ message: 'email is missing from subscribe request body' })
  }

  try {
    const pool = await getConnection()

    if (pool instanceof Error) {
      return res.status(500).send({ message: 'error in database connection' })
    } else {
      // first check if email is found from database
      const sqlResult = await pool
        .request()
        .input('email', sql.VarChar, email)
        .query(subscriptionQuerys.checkSubscriptionByEmail)

      // if email not found in database, then add it. If found, then inform frontend if removal is wanted
      if (sqlResult.rowsAffected[0] === 0) {
        const sqlResult = await pool
          .request()
          .input('email', sql.VarChar, email)
          .query(subscriptionQuerys.addNewSubscription)

        return res.send({ result: { email: email, subscribed: true } })
      } else {
        return res.send({ result: { email: email, subscribed: false } })
      }
    }
  } catch (error) {
    console.log('error', error)
    res
      .status(500)
      .send({ message: 'something went wrong in subscribe function' })
  }
}

// UNSUBSCRIBE
export const unsubscribe: RequestHandler = async (req, res, _next) => {
  const email: string = req.body.email
  if (!email) {
    return res
      .status(500)
      .send({ message: 'email is missing from unsubscribe request body' })
  }

  try {
    const pool = await getConnection()

    if (pool instanceof Error) {
      return res.status(500).send({ message: 'error in database connection' })
    } else {
      // first check if email is found from database
      const sqlResult = await pool
        .request()
        .input('email', sql.VarChar, email)
        .query(subscriptionQuerys.deleteSubscription)

      // Normally allways should be exactly one row, else some weir situation
      if (sqlResult.rowsAffected[0] === 1) {
        return res.send({ email: email, unsubscribed: true })
      } else {
        return res.send({
          message:
            'something weird happened in unsubscription, more than one row affected',
        })
      }
    }
  } catch (error) {
    console.log('error', error)
    res
      .status(500)
      .send({ message: 'something went wrong in unsubscribe function' })
  }
}

// GETSUBSCRIPTIONS
export const getSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    const pool = await getConnection()

    if (pool instanceof Error) {
      return res.status(500).send({ message: 'error in database connection' })
    } else {
      // first check if email is found from database
      const sqlResult = await pool
        .request()
        .query(subscriptionQuerys.getAllSubscriptions)

      // TODO: send emails in correct format to caller
    }
  } catch (error) {
    console.log('error', error)
    res
      .status(500)
      .send({ message: 'something went wrong in getSubscriptions function' })
  }
}
