import express from "express";
import connectToMongo from "./database.mjs";
import auth from "./routes/auth.mjs";
import notes from "./routes/notes.mjs";
const app = express();
const port = 8000;
connectToMongo();

app.use(express.json());

// Available Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
