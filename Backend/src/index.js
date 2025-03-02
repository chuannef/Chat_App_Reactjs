import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";


dotenv.config()
const app = express();

const PORT = process.env.PORT
app.use("/", authRoutes);

app.listen(PORT, () => {
});


console.log("server is running on : " + PORT);