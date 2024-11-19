import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/index";
import workoutRouter from "./routes/workout";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/workout", workoutRouter);

const port = process.env.PORT;
const mongoUrl: string = process.env.MONGO_URL || "";

app.get("/", (req, res) => {
  res.send("working");
});

async function connection() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
}
connection();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
