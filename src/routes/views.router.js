import { Router } from "express";
import { servicesView, availabilityView } from "../controllers/views.controller.js";
const router=Router();
router.get("/services",servicesView);
router.get("/availability",availabilityView);
export default router;
