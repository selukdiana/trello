import { Request, Response } from "express";
import Task from "../models/taskModel";
import Log from "../models/logModel";
import sequelize from "../config/db";

export const getAllTasks = async (req: Request, res: Response) => {
  const listId = req.query.listId as string;
  const data = await Task.findAll({
    attributes: ["id", "value", "order", "listId"],
    where: { listId },
    order: [sequelize.col("order")],
  });
  res.json(data);
};

export const createTask = async (req: Request, res: Response) => {
  const data = req.body;
  const maxOrder: number = (await Task.max("order")) || 0;
  const task = await Task.create({ ...data, order: maxOrder + 1024 });
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
