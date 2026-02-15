import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from "./routes/userRouter"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})