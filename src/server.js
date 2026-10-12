import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/db.js";
import { servicesService } from "./services/services.service.js";
import { serviceCreateSchema } from "./validators/schemas.js";

await connectDB();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
  console.log("Cliente conectado");

    socket.on("newService", async serviceData => {
    try {
      const validation = serviceCreateSchema.safeParse(serviceData);

      if (!validation.success) {
        socket.emit(
          "serviceError",
          "Revisá los campos: la duración debe ser al menos 1 y el precio no puede ser negativo."
        );
        return;
      }

      await servicesService.createService(validation.data);
      socket.emit("serviceCreated");

      const result = await servicesService.getServices({ limit: 100 });
      io.emit("servicesUpdated", result.items);
    } catch (error) {
      console.log(error.message);
      socket.emit("serviceError", "No se pudo crear el servicio.");
    }
  });
});

server.listen(envConfig.port, () => {
  console.log(`Servidor en puerto ${envConfig.port}`);
});
