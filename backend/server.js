import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
   path: `${__dirname}/config.env`,
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log("Listening on port", PORT);
});
