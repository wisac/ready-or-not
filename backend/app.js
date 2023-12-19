import express from "express";
import morgan from "morgan";
import questionsRouter from "./routes/questions.js";
import coursesRouter from "./routes/courses.js"

const app = express();
const API_VERSION_1 = "/api/v1"

app.use(express.json());
app.use(morgan("dev"));
app.use(`${API_VERSION_1}/questions`, questionsRouter);
app.use(`${API_VERSION_1}/courses`,coursesRouter)

export default app;
