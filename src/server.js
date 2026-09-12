import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/db.js";
import { servicesService } from "./services/services.service.js";

await connectDB();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
  console.log("Cliente conectado");

  socket.on("newService", async serviceData => {
    try {
      await servicesService.createService(serviceData);
      const result = await servicesService.getServices({ limit: 100 });
      io.emit("servicesUpdated", result.items);
    } catch (error) {
      console.log(error.message);
    }
  });
});

server.listen(envConfig.port, () => {
  console.log(`Servidor en puerto ${envConfig.port}`);
});
