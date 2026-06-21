import express from "express"
const app = express();
import { connect } from "./config/database.js"
import productRoutes from "./routes/productRoutes.js"

import cors from "cors"

import dotenv from "dotenv"



dotenv.config();
const PORT = process.env.PORT || 5000;


connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS Configuration 
app.use(
  cors({
    origin: ["http://localhost:5173",
      "http://localhost:5174",
      "https://vector-frontend-ruddy.vercel.app",
      "https://vector-frontend-ruddy.vercel.app/"

    ],
    credentials: true,
  })
);



app.use("/api/v1/products", productRoutes);


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: " server is up and running!",
    timestamp: new Date().toLocaleTimeString(),
  });
});


app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Error",
    error: err.message,
  });
});


app.listen(PORT, () => {
  console.log(`
Server is running at: http://localhost:${PORT}
  
 
  `);
});