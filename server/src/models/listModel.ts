import sequelize from "../config/db";
import { DataTypes, Model, Optional } from "sequelize";
import Board from "./boardModel";

interface ListAttributes {
  id: string;
  name: string;
  tasks: string;
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
  tasks: {
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("tasks"));
    },
    set: function (val) {
      this.setDataValue("tasks", JSON.stringify(val));
    },
  },
  boardId: {
    type: DataTypes.UUID,
  },
});

export default List;
