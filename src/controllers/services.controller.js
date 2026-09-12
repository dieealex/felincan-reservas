import { servicesService } from "../services/services.service.js";

export const getServices = async (req, res) => {
  const { category, available, page, limit, sortBy, order } = req.query;

  const filters = {
    category,
    page,
    limit,
    sortBy,
    order
  };

  if (available !== undefined) {
    filters.available = available === "true";
  }

  const result = await servicesService.getServices(filters);

  res.status(200).json({
    status: "success",
    payload: result.items,
    total: result.total,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage
  });
};

export const getServiceById = async (req, res) => {
  try {
    const service = await servicesService.getServiceById(req.params.sid);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      });
    }

    res.status(200).json({
      status: "success",
      payload: service
    });
  } catch {
    res.status(404).json({
      status: "error",
      message: "Servicio no encontrado"
    });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await servicesService.createService(req.body);

    res.status(201).json({
      status: "success",
      payload: service
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await servicesService.updateService(req.params.sid, req.body);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      });
    }

    res.status(200).json({
      status: "success",
      payload: service
    });
  } catch {
    res.status(404).json({
      status: "error",
      message: "Servicio no encontrado"
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await servicesService.deleteService(req.params.sid);

    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      });
    }

    res.status(200).json({
      status: "success",
      payload: service
    });
  } catch {
    res.status(404).json({
      status: "error",
      message: "Servicio no encontrado"
    });
  }
};
