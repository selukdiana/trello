import { Request, Response } from "express";
import Board from "../models/boardModel";

export const getAllBoards = async (req: Request, res: Response) => {
  const data = await Board.findAll();
  res.json(data);
};

export const createBoard = async (req: Request, res: Response) => {
  const data = req.body;
  const board = await Board.create({
    ...data,
  });
  res.status(200).json({ id: board.id, name: board.name });
};

export const updateBoard = async (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  let board = await Board.findOne({ where: { id } });
  await board?.update({ name });
  await board?.save();
  res.status(200).json({ id: board?.id, name: board?.name });
};

export const deleteBoard = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const board = await Board.findOne({ where: { id } });
  await Board.destroy({ where: { id } });
  res.status(200).json({ id: board?.id, name: board?.name });
};
