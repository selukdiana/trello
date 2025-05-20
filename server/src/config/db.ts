import { Sequelize } from "sequelize";
import config from "./config";
import Board from "../models/boardModel";
import List from "../models/listModel";

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    dialect: "postgres",
    host: config.dbHost,
    port: config.dbPort,
  }
);

export default sequelize;
