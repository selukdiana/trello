import sequelize from "../config/db";
import { DataTypes } from "sequelize";
import Board from "./boardModel";

const List = sequelize.define("list", {
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
});

List.hasOne(Board);

export default List;
