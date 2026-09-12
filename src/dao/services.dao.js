import { ServiceModel } from "../models/service.model.js";

export default class ServicesDAO {
  async getAll(filters = {}) {
    const { category, available, page = 1, limit = 10, sortBy, order = "asc" } = filters;

    const query = {};

    if (category) query.category = category;
    if (available !== undefined) query.available = available;

    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;
    const skip = (currentPage - 1) * currentLimit;

    let sortOption = {};

    if (sortBy === "price") {
      sortOption = { price: order === "desc" ? -1 : 1 };
    }

    if (sortBy === "duration") {
      sortOption = { duration: order === "desc" ? -1 : 1 };
    }

    const items = await ServiceModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(currentLimit)
      .lean();

    const total = await ServiceModel.countDocuments(query);
    const totalPages = Math.ceil(total / currentLimit);

    return {
      items,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages,
      hasPrevPage: currentPage > 1,
      hasNextPage: currentPage < totalPages
    };
  }

  getById(id) {
    return ServiceModel.findById(id).lean();
  }

  create(data) {
    return ServiceModel.create(data);
  }

  update(id, data) {
    return ServiceModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  delete(id) {
    return ServiceModel.findByIdAndDelete(id).lean();
  }
}
