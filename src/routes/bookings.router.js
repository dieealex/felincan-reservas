import { Router } from "express";
import {
  createBooking,
  getBookingById,
  addServiceToBooking,
  updateServiceQuantity,
  removeServiceFromBooking,
  clearBooking
} from "../controllers/bookings.controller.js";
import {
  validateBody,
  validateParams
} from "../middlewares/validate.middleware.js";
import {
  bookingCreateSchema,
  addServiceSchema,
  bookingIdSchema,
  quantityUpdateSchema
} from "../validators/schemas.js";

const router = Router();

router.post(
  "/",
  validateBody(bookingCreateSchema),
  createBooking
);

router.get(
  "/:bid",
  validateParams(bookingIdSchema),
  getBookingById
);

router.post(
  "/:bid/services/:sid",
  validateParams(addServiceSchema),
  addServiceToBooking
);

router.put(
  "/:bid/services/:sid",
  validateParams(addServiceSchema),
  validateBody(quantityUpdateSchema),
  updateServiceQuantity
);

router.delete(
  "/:bid/services/:sid",
  validateParams(addServiceSchema),
  removeServiceFromBooking
);

router.delete(
  "/:bid/services",
  validateParams(bookingIdSchema),
  clearBooking
);

export default router;