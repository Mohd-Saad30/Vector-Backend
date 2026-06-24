import express from "express"
import { connect } from "./config/database.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://vector-frontend-ruddy.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Handle preflight for all routes (Express 5 compatible wildcard)
app.options("/{*path}", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

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