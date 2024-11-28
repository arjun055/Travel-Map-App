import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import pinRoute from './routes/pins.js';
import usersRoute from './routes/users.js';

dotenv.config();

const app = express();
const port = 5500;

app.use(express.json());

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=> console.log(err.reason))

app.use("/api/pins",pinRoute);
app.use("/api/users",usersRoute);

app.listen(port,()=>{
    console.log(`server listening on port ${port}...`);
})