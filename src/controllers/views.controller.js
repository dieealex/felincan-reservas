import { servicesService } from "../services/services.service.js";

export const servicesView = async (req, res) => {
  const result = await servicesService.getServices({ limit: 100 });
  res.render("services", { services: result.items });
};

export const availabilityView = async (req, res) => {
  const result = await servicesService.getServices({ available: true, limit: 100 });
  res.render("availability", { services: result.items });
};
