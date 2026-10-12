import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) throw new Error("Falta PORT");
if (!process.env.NODE_ENV) throw new Error("Falta NODE_ENV");
if (!process.env.MONGO_URI) throw new Error("Falta MONGO_URI");
if (!process.env.MONGO_DB_NAME) {
  throw new Error("Falta MONGO_DB_NAME");
}

export const envConfig = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME
};
