import express from "express";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  const uuid = uuidv4();
  const privateKey = fs.readFileSync("../key");
  const token = jwt.sign({ uuid }, privateKey, { algorithm: "RS256" });
  res.send(token);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
