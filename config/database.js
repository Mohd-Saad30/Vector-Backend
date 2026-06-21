import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

export const connect = () => {
    mongoose.connect(process.env.Database_Uri)
        .then(() => console.log("DB Connected Successfully"))
        .catch((err) => {
            console.log("DB Connection Failed");
            console.error(err);
            process.exit(1);
        });
};