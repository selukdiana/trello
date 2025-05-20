import { Request, Response } from "express";
import List from "../models/listModel";
import { v4 as uuid } from "uuid";
import sequelize from "../config/db";
import Task from "../models/taskModel";

export const getAllTasks = async (req: Request, res: Response) => {
  const listId = req.query.listId as string;
  const data = await Task.findAll({ where: { listId } });
  res.json(data);
};
export const createTask = async (req: Request, res: Response) => {
  const data = req.body;
  const task = await Task.create({ ...data });
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
  res.status(200).json(task);
};
