import { bookingsRepository } from "../repositories/bookings.repository.js";
import { servicesRepository } from "../repositories/services.repository.js";

export const bookingsService = {
  createBooking: data =>
    bookingsRepository.create({ ...data, services: [] }),

  getBookingById: id =>
    bookingsRepository.getByIdPopulated(id),

  async addServiceToBooking(bid, sid) {
    const service = await servicesRepository.getById(sid);

    if (!service) return { error: "service" };

    const booking = await bookingsRepository.getById(bid);

    if (!booking) return { error: "booking" };

    const services = booking.services || [];
    const item = services.find(
      serviceItem => String(serviceItem.service) === String(sid)
    );

    if (item) {
      item.quantity += 1;
    } else {
      services.push({ service: sid, quantity: 1 });
    }

    return bookingsRepository.update(bid, { services });
  },

  async updateServiceQuantity(bid, sid, quantity) {
    if (quantity % 1 !== 0) {
      return { error: "quantity" };
    }

    const booking = await bookingsRepository.getById(bid);

    if (!booking) return { error: "booking" };

    const item = booking.services.find(
      serviceItem => String(serviceItem.service) === String(sid)
    );

    if (!item) return { error: "item" };

    item.quantity = quantity;

    return bookingsRepository.update(bid, {
      services: booking.services
    });
  },

  async removeServiceFromBooking(bid, sid) {
    const booking = await bookingsRepository.getById(bid);

    if (!booking) return { error: "booking" };

    const item = booking.services.find(
      serviceItem => String(serviceItem.service) === String(sid)
    );

    if (!item) return { error: "item" };

    const services = booking.services.filter(
      serviceItem => String(serviceItem.service) !== String(sid)
    );

    return bookingsRepository.update(bid, { services });
  },

  async clearBooking(bid) {
    const booking = await bookingsRepository.getById(bid);

    if (!booking) return null;

    return bookingsRepository.update(bid, {
      services: []
    });
  }
};