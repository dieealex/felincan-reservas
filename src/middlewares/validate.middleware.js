import mongoose from "mongoose";

export const validateBody = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Datos inválidos: revisá los campos obligatorios, tipos y valores"
    });
  }

  req.body = result.data;
  next();
};

export const validateParams = schema => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Los identificadores deben tener 24 caracteres"
    });
  }

  const { bid, sid } = result.data;

  if (bid !== undefined && !mongoose.Types.ObjectId.isValid(bid)) {
    return res.status(400).json({
      status: "error",
      message: "El identificador de la reserva no es válido"
    });
  }

  if (sid !== undefined && !mongoose.Types.ObjectId.isValid(sid)) {
    return res.status(400).json({
      status: "error",
      message: "El identificador del servicio no es válido"
    });
  }

  next();
};

export const validateQuery = schema => (req, res, next) => {
  const { category, available, page, limit, sortBy, order } = req.query;

  const result = schema.safeParse({
    category,
    available,
    page: page === undefined ? 1 : Number(page),
    limit: limit === undefined ? 10 : Number(limit),
    sortBy,
    order
  });

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Filtros inválidos: page y limit deben ser números positivos"
    });
  }

  if (result.data.page % 1 !== 0 || result.data.limit % 1 !== 0) {
    return res.status(400).json({
      status: "error",
      message: "page y limit deben ser números enteros"
    });
  }

  if (
    available !== undefined &&
    available !== "true" &&
    available !== "false"
  ) {
    return res.status(400).json({
      status: "error",
      message: "available debe ser true o false"
    });
  }

  if (
    sortBy !== undefined &&
    sortBy !== "price" &&
    sortBy !== "duration"
  ) {
    return res.status(400).json({
      status: "error",
      message: "sortBy debe ser price o duration"
    });
  }

  if (order !== undefined && order !== "asc" && order !== "desc") {
    return res.status(400).json({
      status: "error",
      message: "order debe ser asc o desc"
    });
  }

  next();
};