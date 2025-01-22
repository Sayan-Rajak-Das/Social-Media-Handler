import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import userCrudRoutes from './routes/userCrud.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    credentials : true,
    origin : "*"
}))

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Social Media Handler API');
});

app.use("/app/auth", authRoutes)

app.use("/app", userCrudRoutes)


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port number ${PORT}`);
    connectDB();
})
