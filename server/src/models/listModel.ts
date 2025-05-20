import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
import Board from "./boardModel";
import Task from "./taskModel";
interface ListAttributes {
  id: string;
  name: string;
  boardId: string;
}

interface ListCreationAttributes extends Optional<ListAttributes, "id"> {}
interface ListInstance
  extends Model<ListAttributes, ListCreationAttributes>,
    ListAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const List = sequelize.define<ListInstance>("list", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  boardId: {
    type: DataTypes.UUID,
  },
});

List.hasMany(Task);
Task.belongsTo(List);

export default List;
