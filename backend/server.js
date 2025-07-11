import  express from 'express';
import cors from 'cors';
const app= express();
const port =8000;

import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import carsRouter from './routes/cars.js';
import auditRouter from  './routes/audit.js';

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true 
}))
dotenv.config();
app.get('/',(req,res)=>{
   res.send("Hello world");
})
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/user',userRouter);
app.use('/api/cars',carsRouter);
app.use('/api/audit',auditRouter);
app.listen(port,()=>{
   console.log(`Server is running on http://localhost:${port}`);
})