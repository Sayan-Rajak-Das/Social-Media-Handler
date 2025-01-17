import express from "express";
import {
  allUsers,
  updateUser,
  getUser,
  userUploads,
  uploadMiddleware,
} from "../controllers/userCrud.controller.js";

const router = express.Router();

router.get("/users", allUsers);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUser);
router.post("/user-upload", uploadMiddleware, userUploads);

export default router;
