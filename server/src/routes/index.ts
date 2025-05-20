import express from "express";
import bodyParser from "body-parser";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  updateBoard,
} from "../controllers/boardController";
import {
  createList,
  deleteList,
  getAllLists,
  updateListName,
} from "../controllers/listController";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";
import { moveTaskWithinList } from "../controllers/dndController";

const router = express.Router();

router.get("/api/getAllBoards", getAllBoards);
router.post("/api/createBoard", express.json(), createBoard);
router.patch("/api/updateBoard", bodyParser.json(), updateBoard);
router.delete("/api/deleteBoard", deleteBoard);

router.get("/api/getAllLists", getAllLists);
router.post("/api/createList", express.json(), createList);
router.patch("/api/updateListName", bodyParser.json(), updateListName);
router.delete("/api/deleteList", deleteList);

router.get("/api/getAllTasks", getAllTasks);
router.post("/api/createTask", express.json(), createTask);
router.patch("/api/updateTask", bodyParser.json(), updateTask);
router.delete("/api/deleteTask", deleteTask);

router.patch("/api/moveTaskWithinList", bodyParser.json(), moveTaskWithinList);

export default router;
