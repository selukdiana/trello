import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface TaskAttributes {
  id: string;
  value: string;
  listId: string;
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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
  },
  listId: {
    type: DataTypes.UUID,
  },
});

export default Task;
