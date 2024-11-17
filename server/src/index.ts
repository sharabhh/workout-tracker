import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.get("/", (req,res)=>{
    res.send('working')
})

app.listen(port, () => {
  console.log(`Serevr running on port: ${port}`);
});
