import { Task, TASK_PRIORITY, TASK_STATUS } from "../models/taskModel";

export type TaskFilters = {
  status?: TASK_STATUS;
  priority?: TASK_PRIORITY;
};

export async function getTasks(filters?: TaskFilters, sort?: 1 | -1) {
  try {
    const query = Task.find();
    const { status, priority } = filters ?? {};
    if (status) {
      query.where({ status });
    }
    if (priority) {
      query.where({ priority });
    }
    if (sort) {
      query.sort({ dueDate: sort });
    }
    const tasks = await query.exec();
    return tasks;
  } catch (err) {
    throw err;
  }
}

export async function createTask(
  title: string,
  priority: TASK_PRIORITY,
  dueDate?: Date,
  description?: string
) {
  try {
    const newTask = await Task.create({
      title,
      priority,
      dueDate,
      description,
      status: TASK_STATUS.TO_DO,
    });
    return newTask;
  } catch (err) {
    throw err;
  }
}

export async function updateTask(
  taskId: string,
  title?: string,
  status?: TASK_STATUS,
  priority?: TASK_PRIORITY,
  dueDate?: Date,
  description?: string
) {
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        status,
        priority,
        dueDate,
        description,
      },
      { new: true }
    );
    return task;
  } catch (err) {
    throw err;
  }
}

export async function deleteTask(taskId: string) {
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (err) {
    throw err;
  }
}
