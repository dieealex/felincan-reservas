import { bookingsService } from "../services/bookings.service.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await bookingsService.createBooking(req.body);

    res.status(201).json({
      status: "success",
      payload: booking
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo crear la reserva"
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.bid);

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      payload: booking
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo consultar la reserva"
    });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const result = await bookingsService.addServiceToBooking(
      req.params.bid,
      req.params.sid
    );

    if (result.error === "service") {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado"
      });
    }

    if (result.error === "booking") {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      payload: result
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo agregar el servicio"
    });
  }
};

export const updateServiceQuantity = async (req, res) => {
  try {
    const result = await bookingsService.updateServiceQuantity(
      req.params.bid,
      req.params.sid,
      req.body.quantity
    );

    if (result.error === "quantity") {
      return res.status(400).json({
        status: "error",
        message: "La cantidad debe ser un número entero"
      });
    }

    if (result.error === "booking") {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada"
      });
    }

    if (result.error === "item") {
      return res.status(404).json({
        status: "error",
        message: "El servicio no está asociado a esta reserva"
      });
    }

    res.status(200).json({
      status: "success",
      payload: result
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo actualizar la cantidad"
    });
  }
};

export const removeServiceFromBooking = async (req, res) => {
  try {
    const result = await bookingsService.removeServiceFromBooking(
      req.params.bid,
      req.params.sid
    );

    if (result.error === "booking") {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada"
      });
    }

    if (result.error === "item") {
      return res.status(404).json({
        status: "error",
        message: "El servicio no está asociado a esta reserva"
      });
    }

    res.status(200).json({
      status: "success",
      payload: result
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo quitar el servicio"
    });
  }
};

export const clearBooking = async (req, res) => {
  try {
    const booking = await bookingsService.clearBooking(req.params.bid);

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      payload: booking
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "error",
      message: "No se pudo vaciar la reserva"
    });
  }
};