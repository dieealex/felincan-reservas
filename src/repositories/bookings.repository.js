import BookingsDAO from "../dao/bookings.dao.js";

const dao = new BookingsDAO();

export const bookingsRepository = {
  create: data => dao.create(data),
  getById: id => dao.getById(id),
  getByIdPopulated: id => dao.getByIdPopulated(id),
  update: (id, data) => dao.update(id, data)
};
