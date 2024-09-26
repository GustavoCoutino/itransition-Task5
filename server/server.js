import express from "express";
import userRoutes from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "itransition-task5-sable.vercel.app",
  "itransition-task5-git-main-gustavocoutinos-projects.vercel.app",
  "itransition-task5-6u7vdeoi5-gustavocoutinos-projects.vercel.app",
];

app.use(express.json());
app.use(
  cors(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
    })
  )
);
app.use(bodyParser.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
