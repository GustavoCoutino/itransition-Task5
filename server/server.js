import express from "express";
import userRoutes from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5001;

const allowedOrigins = [
  "https://itransition-task5-sable.vercel.app",
  "https://itransition-task5-git-main-gustavocoutinos-projects.vercel.app",
  "https://itransition-task5-6u7vdeoi5-gustavocoutinos-projects.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
