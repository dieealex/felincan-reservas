import { Router } from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from "../controllers/services.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  serviceCreateSchema,
  serviceUpdateSchema
} from "../validators/schemas.js";

const router = Router();

router.get("/", getServices);
router.get("/:sid", getServiceById);
router.post("/", validateBody(serviceCreateSchema), createService);
router.put("/:sid", validateBody(serviceUpdateSchema), updateService);
router.delete("/:sid", deleteService);

export default router;
