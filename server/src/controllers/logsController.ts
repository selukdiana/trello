import { Request, Response } from "express";
import Log from "../models/logModel";

export const fetchLogs = async (req: Request, res: Response) => {
  const data = await Log.findAll();
  res.json(data);
};
