import express from "express";
import { generateData } from "../controllers/dataController.js";

const router = express.Router();

router.post("/", generateData);

export default router;
