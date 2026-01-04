import express from 'express';
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from "dotenv"
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
app.use(express.json()) //need this for reading body 
const PORT = process.env.PORT || 5001


// middleware

app.use(rateLimiter)
app.use("/api/notes", notesRoutes); //instead of writting api/notes in all routes we using app.use ....by importing


app.use((req, res, next) =>{
  console.log(`the req method is ${req.method} and Req URL is ${req.url}` )
  next();
})

connectDB().then(() => {       //db connected first then applicated should start , small optimization
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});
