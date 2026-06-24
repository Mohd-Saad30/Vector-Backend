import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connect = async () => {
  if (mongoose.connection.readyState === 1) return

  const uri = process.env.Database_Uri || process.env.MONGODB_URI || process.env.DATABASE_URI
  if (!uri) {
    console.error("Missing MongoDB connection string. Set Database_Uri or MONGODB_URI.")
    return
  }

  try {
    await mongoose.connect(uri)
    console.log("DB Connected Successfully")
  } catch (err) {
    console.error("DB Connection Failed:", err)
  }
}
