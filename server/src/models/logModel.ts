import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface LogAttributes {
  id: string;
  value: string;
}

interface LogCreationAttributes extends Optional<LogAttributes, "id"> {}
interface BoardInstance
  extends Model<LogAttributes, LogCreationAttributes>,
    LogAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
const Log = sequelize.define<BoardInstance>("log", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
  },
});

export default Log;
