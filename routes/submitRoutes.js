import express  from "express";
const router = express.Router();
import { submit } from "../controllers/submitController.js";

router.post("/details",submit);

export default router