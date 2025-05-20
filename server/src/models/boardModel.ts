import sequelize from "../config/db";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import List from "./listModel";
import Task from "./taskModel";

interface BoardAttributes {
  id: string;
  name: string;
}

interface BoardCreationAttributes extends Optional<BoardAttributes, "id"> {}
interface BoardInstance
  extends Model<BoardAttributes, BoardCreationAttributes>,
    BoardAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const Board = sequelize.define<BoardInstance>("board", {
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
List.belongsTo(Board);

export default Board;
