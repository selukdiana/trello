import express from "express";
import bodyParser from "body-parser";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  updateBoard,
} from "../controllers/boardController";

const router = express.Router();

router.get("/api/getAllBoards", getAllBoards);
router.post("/api/createBoard", express.json(), createBoard);
router.patch("/api/updateBoard", bodyParser.json(), updateBoard);
router.delete("/api/deleteBoard", deleteBoard);

export default router;
