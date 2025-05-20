import { Request, Response } from "express";
import Task from "../models/taskModel";
import Log from "../models/logModel";

export const getAllTasks = async (req: Request, res: Response) => {
  const listId = req.query.listId as string;
  const data = await Task.findAll({ where: { listId } });
  res.json(data);
};
export const createTask = async (req: Request, res: Response) => {
  const data = req.body;
  const task = await Task.create({ ...data });
  await Log.create({
    value: `created task <${task.value}>`,
  });
  res.status(200).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id, value } = req.body;
  const task = await Task.findOne({ where: { id } });
  if (!task) {
    res.status(400).send();
    return;
  }
  task.update({
    value,
  });
  task.save();
  await Log.create({
    value: `updated task <${task.value}>`,
  });
  res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const task = await Task.findOne({ where: { id } });
  if (!task) {
    res.status(400).send();
    return;
  }
  await Task.destroy({ where: { id } });
  await Log.create({
    value: `deleted task <${task.value}>`,
  });
  res.status(200).json(task);
};
