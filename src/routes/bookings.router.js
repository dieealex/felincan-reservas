import { Router } from "express";
import {
  createBooking,
  getBookingById,
  addServiceToBooking
} from "../controllers/bookings.controller.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import {
  bookingCreateSchema,
  addServiceSchema
} from "../validators/schemas.js";

const router = Router();

router.post("/", validateBody(bookingCreateSchema), createBooking);
router.get("/:bid", getBookingById);
router.post("/:bid/services/:sid", validateParams(addServiceSchema), addServiceToBooking);

export default router;
