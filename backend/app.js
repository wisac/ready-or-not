import express from "express";
import morgan from "morgan";
import questionsRouter from "./routes/questions.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/", questionsRouter);

export default app;
