import express from "express";
import morgan from "morgan";
import questionsRouter from "./routes/questions.js";
import coursesRouter from "./routes/courses.js";
import notFoundRouter from "./routes/notFound.js";
import globalErrorHandler from "./controllers/globalErrorHandler.js";

const app = express();
const API_VERSION_1 = "/api/v1";

app.use(express.json());
app.use(morgan("dev"));
app.use(`${API_VERSION_1}/questions`, questionsRouter);
app.use(`${API_VERSION_1}/courses`, coursesRouter);

// undefined routes middleware
app.all("*", notFoundRouter);

// global error middleware
app.use(globalErrorHandler);

export default app;
