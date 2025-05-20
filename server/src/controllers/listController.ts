import { Request, Response } from "express";
import List from "../models/listModel";
import Log from "../models/logModel";

export const getAllLists = async (req: Request, res: Response) => {
  const boardId = req.query.id as string;
  const data = await List.findAll({ where: { boardId } });
  res.json(data);
};

export const createList = async (req: Request, res: Response) => {
  const data = req.body;
  const list = await List.create({
    ...data,
  });
  await Log.create({
    value: `created list <${list.name}>`,
  });
  res.status(200).json({ id: list.id, name: list.name, tasks: [] });
};

export const updateListName = async (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  let list = await List.findOne({ where: { id } });
  await list?.update({ name });
  await list?.save();
  await Log.create({
    value: `updated list <${list?.name}>`,
  });
  res.status(200).json({ id: list?.id, name: list?.name });
};

export const deleteList = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const list = await List.findOne({ where: { id } });
  await List.destroy({ where: { id } });
  await Log.create({
    value: `deleted list <${list?.name}>`,
  });
  res.status(200).json({ id: list?.id });
};
