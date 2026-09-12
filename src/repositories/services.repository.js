import ServicesDAO from "../dao/services.dao.js";

const dao = new ServicesDAO();

export const servicesRepository = {
  getAll: filters => dao.getAll(filters),
  getById: id => dao.getById(id),
  create: data => dao.create(data),
  update: (id, data) => dao.update(id, data),
  delete: id => dao.delete(id)
};
