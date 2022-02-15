import express from "express";
import connectToMongo from "./database";

const app = express();
const port = 3000;
connectToMongo();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
