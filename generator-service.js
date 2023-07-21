import express from "express";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
const port = 3001;

app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ token: null, error: "id is required" });

  const keyRoute = process.env.SECRET_FILE ?? "../key";
  const privateKey = fs.readFileSync(keyRoute);
  const token = jwt.sign({ id }, privateKey, { algorithm: "RS256" });
  res.json({ token, error: null });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
