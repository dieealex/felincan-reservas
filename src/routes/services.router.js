import { Router } from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from "../controllers/services.controller.js";
import {
  validateBody,
  validateParams,
  validateQuery
} from "../middlewares/validate.middleware.js";
import {
  serviceCreateSchema,
  serviceUpdateSchema,
  serviceIdSchema,
  servicesQuerySchema
} from "../validators/schemas.js";

const router = Router();

router.get(
  "/",
  validateQuery(servicesQuerySchema),
  getServices
);

router.get(
  "/:sid",
  validateParams(serviceIdSchema),
  getServiceById
);

router.post(
  "/",
  validateBody(serviceCreateSchema),
  createService
);

router.put(
  "/:sid",
  validateParams(serviceIdSchema),
  validateBody(serviceUpdateSchema),
  updateService
);

router.delete(
  "/:sid",
  validateParams(serviceIdSchema),
  deleteService
);

export default router;