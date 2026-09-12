import { BookingModel } from "../models/booking.model.js";

export default class BookingsDAO {
  create(data) {
    return BookingModel.create(data);
  }

  getById(id) {
    return BookingModel.findById(id).lean();
  }

  getByIdPopulated(id) {
    return BookingModel.findById(id).populate("services.service").lean();
  }

  update(id, data) {
    return BookingModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }
}
