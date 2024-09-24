import { Schema, model } from "mongoose";

export enum TASK_STATUS {
  TO_DO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum TASK_PRIORITY {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required!"],
  },
  descrption: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: TASK_STATUS,
    required: true,
    default: TASK_STATUS.TO_DO,
  },
  priority: {
    type: String,
    enum: TASK_PRIORITY,
    required: true,
  },
  dueDate: {
    type: Date,
  },
});

export const Task = model("Task", taskSchema);
