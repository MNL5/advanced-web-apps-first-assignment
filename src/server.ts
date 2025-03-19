import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import authRoutes from "./routes/authRoutes";
import commentsRoute from "./routes/commentRoutes";
import filesRoute from "./routes/fileRoutes";
import postsRoute from "./routes/postRoutes";
import usersRoute from "./routes/userRoutes";
import path from "path";

if (process.env.NODE_ENV == "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}
const app = express();

const uploadDir = path.join(__dirname, "../public"); // Define the directory

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web REST API",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "*");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/files", filesRoute);

app.use(bodyParser.json({ limit: "10mb" }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/auth", authRoutes);
app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/public", express.static("public"));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const appStart = () => {
  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DB_CONNECT) {
      reject("DB_CONNECT is not defined in .env file");
    } else {
      mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export default appStart;
