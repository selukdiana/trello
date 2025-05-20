import express from "express";
import cors from "cors";
import sequelize from "./src/config/db";
import router from "./src/routes";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
