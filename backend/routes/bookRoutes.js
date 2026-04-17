import express from "express";
import authMiddleware from "../auth/userAuth.js";
import upload from "../middleware/multer.js";
const router = express.Router();
import {
  login,
  register,
  getBooks,
  newBooks,
  updateBooks,
  deleteBooks,
} from "../controllers/bookController.js";

router.get("/books", getBooks);
router.post("/books", authMiddleware, newBooks);
router.put("/books/:id", authMiddleware, updateBooks);
router.delete("/books/:id", authMiddleware, deleteBooks);
router.post("/login", login);
router.post("/register", register);

export default router;
