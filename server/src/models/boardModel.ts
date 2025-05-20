import sequelize from "../config/db";
import { DataTypes } from "sequelize";
import List from "./listModel";

const Board = sequelize.define("board", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

Board.hasMany(List);

export default Board;
