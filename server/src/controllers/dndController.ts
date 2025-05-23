import Log from "../models/logModel";
import Task from "../models/taskModel";
import { Request, Response } from "express";

export const moveTaskWithinList = async (req: Request, res: Response) => {
  const { activeTask, newOrder } = req.body;
  const active = await Task.findOne({ where: { id: activeTask.id } });
  await active?.update({
    listId: activeTask.listId,
    order: newOrder,
  });
  await active?.save();
  await Log.create({
    value: `task moved <${activeTask.value}>`,
  });
  res.status(200).json(active);
};
