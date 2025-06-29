import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/mongoDB.js"
import userRouter from "./routes/userRoute.js"
import imageRouter from "./routes/imageRoute.js"


dotenv.config();

connectDB()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("hello world")
// })


app.use("/api/users", userRouter)
app.use('/api/images', imageRouter)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

// 4QYFSQU8nUZyUB20