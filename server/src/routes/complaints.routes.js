import express from "express";
import {
  getComplaints,
  loginAdmin,
  createComplaints
} from "../controllers/complaints.controller.js";

const router = express.Router();

router.get("/api/complaints", getComplaints);
router.post("/api/complaints", createComplaints);
router.post("/api/admin/login", loginAdmin);

export default router;
