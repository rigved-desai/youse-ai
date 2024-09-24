import * as taskService from "../services/taskService";
import { Request, Response } from "express";
import { TASK_PRIORITY, TASK_SORTING, TASK_STATUS } from "../models/taskModel";
import { handleError } from "../utils/utils";

export type GetTasksRequest = {
  status?: TASK_STATUS;
  priority?: TASK_PRIORITY;
  sort?: TASK_SORTING;
};

export async function getTasks(
  req: Request<{}, GetTasksRequest>,
  res: Response
) {
  let { status, priority, sort } = req.query;

  if (status && !Object.values(TASK_STATUS).includes(status as TASK_STATUS)) {
    return res.status(400).json({
      error: "Invalid status value",
    });
  }
  if (
    priority &&
    !Object.values(TASK_PRIORITY).includes(priority as TASK_PRIORITY)
  ) {
    return res.status(400).json({
      error: "Invalid priority value",
    });
  }
  if (sort && !Object.values(TASK_SORTING).includes(sort as TASK_SORTING)) {
    return res.status(400).json({
      error: "Invalid sort value",
    });
  }

  const taskStatus = status as TASK_STATUS | undefined;
  const taskPriority = priority as TASK_PRIORITY | undefined;
  const taskSorting = sort as TASK_SORTING | undefined;
  try {
    const tasks = await taskService.getTasks(
      { status: taskStatus, priority: taskPriority },
      taskSorting
    );
    return res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      error: handleError(err),
    });
  }
}

export type CreateTaskRequest = {
  title?: string;
  description?: string;
  priority?: TASK_PRIORITY;
  dueDate?: Date;
};

export async function createTask(
  req: Request<{}, {}, CreateTaskRequest>,
  res: Response
) {
  const { title, description, priority, dueDate } = req.body;
  if (!title) {
    return res.status(400).json({
      error: "Invalid arguments: Task title is required!",
    });
  }
  if (!priority) {
    return res.status(400).json({
      error: "Invalid arguments: Task priority is required!",
    });
  }
  try {
    const newTask = await taskService.createTask(
      title,
      priority,
      dueDate,
      description
    );
    return res.status(201).json({
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      error: handleError(err),
    });
  }
}

export type UpdateTaskRequestParams = {
  taskId: string;
};

export type UpdateTaskRequestBody = {
  title?: string;
  status?: TASK_STATUS;
  priority?: TASK_PRIORITY;
  dueDate?: Date;
  description?: string;
};

export async function updateTask(
  req: Request<UpdateTaskRequestParams, {}, UpdateTaskRequestBody>,
  res: Response
) {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).json({
      error: "Invalid arguments: Task ID is required!",
    });
  }
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const updatedTask = await taskService.updateTask(
      taskId,
      title,
      status,
      priority,
      dueDate,
      description
    );
    return res.status(200).json({
      data: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      error: handleError(err),
    });
  }
}

export type DeleteTaskRequestParams = {
  taskId: string;
};

export async function deleteTask(
  req: Request<DeleteTaskRequestParams>,
  res: Response
) {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).json({
      error: "Invalid arguments: Task ID is required!",
    });
  }
  try {
    await taskService.deleteTask(taskId as string);
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      error: handleError(err),
    });
  }
}
