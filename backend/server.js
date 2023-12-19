/* eslint-disable import/first */
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

// handle uncaught exceptions
process.on("uncaughtException", (error) => {
   console.error("ERROR:", error.name, error.message);
   console.log("UNCAUGHT EXCEPTION: Shutting down...");
   process.exit(1);
});

import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
   path: `${__dirname}/.env`,
});

// connect to db and listen for requests
let server;
const DB_CONN_URL = process.env.DB_CONN_URL.replace(
   "<password>",
   process.env.DB_PASSWORD
).replace("<username>", process.env.DB_USERNAME);

mongoose.connect(DB_CONN_URL, { dbName: process.env.DB_NAME }).then(() => {
   const PORT = process.env.PORT || 3000;
   server = app.listen(PORT, () => {
      console.log("Connected to DB");
      console.log("Listening on port", PORT);
   });
});

// handle unhandled rejected promises(for async codes)
process.on("unhandledRejection", (error) => {
   console.error("ERROR:", error.name, error.message);
   console.log("UNHANDLED REJECTION: Shutting down application...");
   if (server) {
      server.close();
   }
   process.exit(1);
});
