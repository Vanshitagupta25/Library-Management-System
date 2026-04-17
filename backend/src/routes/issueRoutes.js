import express from "express";
import authMiddleware from "../auth/userAuth.js";
const router = express.Router();

import {
  issueBook,
  returnBook,
  myBooks,
} from "../controllers/issueController.js";

router.post("/issue", authMiddleware, issueBook);
router.post("/return", authMiddleware, returnBook);
router.get("/mybooks", authMiddleware, myBooks);

export default router;
