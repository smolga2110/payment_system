import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from "./routes/userRouter"
import walletRoutes from "./routes/walletRouter"
import transactionRoutes from "./routes/transactionRouter"
import { errorHandler } from './middleware/errorHandler';

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/wallets", walletRoutes)
app.use("/api/transactions", transactionRoutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})