import { servicesService } from "../services/services.service.js";

export const getServices = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudieron consultar los servicios"
    });
  }
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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo consultar el servicio"
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
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo crear el servicio"
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await servicesService.updateService(
      req.params.sid,
      req.body
    );

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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el servicio"
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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el servicio"
    });
  }
};