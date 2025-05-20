import { Request, Response } from "express";
import List from "../models/listModel";

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
  res.status(200).json({ id: list.id, name: list.name, tasks: [] });
};

export const updateListName = async (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  let list = await List.findOne({ where: { id } });
  await list?.update({ name });
  await list?.save();
  res.status(200).json({ id: list?.id, name: list?.name });
};

export const deleteList = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const list = await List.findOne({ where: { id } });
  await List.destroy({ where: { id } });
  res.status(200).json({ id: list?.id });
};
