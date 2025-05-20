import dotenv from "dotenv";

dotenv.config();

interface Config {
  dbUser: string;
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbPort: number;
}

const config: Config = {
  dbUser: String(process.env.DB_USER),
  dbPort: Number(process.env.DB_PORT),
  dbHost: String(process.env.DB_HOST),
  dbName: String(process.env.DB_NAME),
  dbPassword: String(process.env.DB_PASSWORD),
};

export default config;
