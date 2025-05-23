import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface TaskAttributes {
  id: number;
  value: string;
  listId: string;
  order: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id"> {}
interface TaskInstance
  extends Model<TaskAttributes, TaskCreationAttributes>,
    TaskAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const Task = sequelize.define<TaskInstance>("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
  },
  listId: {
    type: DataTypes.UUID,
  },
  order: {
    type: DataTypes.INTEGER,
  },
});

export default Task;
