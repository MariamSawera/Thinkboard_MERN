import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import path from "path"
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


// middleware
if(process.env.NODE_ENV !== "production") {

  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

app.use(express.json()) //need this for reading body 
app.use(rateLimiter);
app.use("/api/notes", notesRoutes); //instead of writting api/notes in all routes we using app.use ....by importing
  

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

}
app.use((req, res, next) =>{
  console.log(`the req method is ${req.method} and Req URL is ${req.url}` );
  next();
})

connectDB().then(() => {       //db connected first then applicated should start , small optimization
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});
