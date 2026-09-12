import { servicesRepository } from "../repositories/services.repository.js";

export const servicesService = {
  getServices: filters => servicesRepository.getAll(filters),
  getServiceById: id => servicesRepository.getById(id),
  createService: data => servicesRepository.create(data),
  updateService: (id, data) => servicesRepository.update(id, data),
  deleteService: id => servicesRepository.delete(id)
};
