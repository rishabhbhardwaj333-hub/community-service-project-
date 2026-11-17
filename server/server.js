import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import complaintRoutes from './routes/complaints.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/api/complaints', complaintRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.error('DB connection failed:', err.message))