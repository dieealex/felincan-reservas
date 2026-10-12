import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

export const connectDB = async () => {
  await mongoose.connect(envConfig.mongoUri, {
    dbName: envConfig.mongoDbName
  });
  console.log("MongoDB conectado");
};
