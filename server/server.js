import express from "express";
import userRoutes from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "itransition-task5-sable.vercel.app",
  methods: "GET,POST,PUT,DELETE",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
