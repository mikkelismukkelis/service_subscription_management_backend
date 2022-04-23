import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import subscribeRoutes from './routes/subscribe'

const app = express()
dotenv.config()
app.use(cors())

let PORT = process.env.PORT

app.use(express.json())

// For serving react frontend, build and copy to root of this app
app.use(express.static('build'))

app.use('/api', subscribeRoutes)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
