import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.route("/").get(getTasks);
taskRouter.route("/").post(createTask);

taskRouter.route("/:taskId").put(updateTask);
taskRouter.route("/:taskId").delete(deleteTask);

export default taskRouter;
