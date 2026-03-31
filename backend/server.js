import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/db.js";
import cors from "cors";
import authRoute from "./src/routes/auth.routes.js";
  
dotenv.config(); 
    
const app = express();
app.use(cors());
app.use(express.json());

dbConnection(); 
app.use('/api/auth',authRoute);


app.get("/", (req, res) => {
  res.send("Invoice SaaS Backend Running on server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));