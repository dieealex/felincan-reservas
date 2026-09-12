export const validateBody = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Datos inválidos"
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
      message: "Parámetros inválidos"
    });
  }

  next();
};
