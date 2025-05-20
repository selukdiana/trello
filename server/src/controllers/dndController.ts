import Log from "../models/logModel";
import Task from "../models/taskModel";
import { Request, Response } from "express";

export const moveTaskWithinList = async (req: Request, res: Response) => {
  const { activeTask, overTask } = req.body;
  const active = await Task.findOne({ where: { id: activeTask.id } });
  const over = await Task.findOne({ where: { id: overTask.id } });
  active?.update({
    id: overTask.id,
    value: overTask.value,
    listId: overTask.listId,
  });
  active?.save();
  over?.update({
    id: activeTask.id,
    value: activeTask.value,
    listId: activeTask.listId,
  });
  over?.save();
  await Log.create({
    value: `task moved <${activeTask.value}>`,
  });
  res.status(200).json("ok");
};
