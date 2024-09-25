import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { validateToken } from "../middleware/authMiddleware";

const taskRouter = Router();

taskRouter.use(validateToken);

taskRouter.route("/").get(getTasks);
taskRouter.route("/").post(createTask);

taskRouter.route("/:taskId").put(updateTask);
taskRouter.route("/:taskId").delete(deleteTask);

export default taskRouter;
