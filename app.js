import express from "express";
const app = express();
require("dotenv").config();
const port = process.env.PORT;

import { connect, connection } from "mongoose";
connect(process.env.DB_CONNECT);
const db = connection;
db.on("error", (error) => console.error("DB Error:" + error));
db.once("open", () => console.log("Connected to database"));

import { json, urlencoded } from "body-parser";
app.use(json());
app.use(urlencoded({ extended: true }));

import postsRoute from "./routes/postRoutes";
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});