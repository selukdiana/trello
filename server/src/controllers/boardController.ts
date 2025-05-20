import { Request, Response } from "express";
import Board from "../models/boardModel";

export const getAllBoards = async (req: Request, res: Response) => {
  const data = await Board.findAll();
  res.json(data);
};

export const createBoard = async (req: Request, res: Response) => {
  const data = req.body;
  await Board.create({
    ...data,
  });
  res.status(200).send();
};

export const updateBoard = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  let board = await Board.findOne({ where: { id } });
  await board?.update({ ...data });
  await board?.save();
  res.status(200).send();
};

export const deleteBoard = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Board.destroy({ where: { id } });
  res.status(200).send();
};
