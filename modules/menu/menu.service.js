import Menu from "./menu.model.js";

export const createMenuItem = async (data) => {
  return await Menu.create(data);
};

export const getMenuList = async (filters, options) => {
  const query = {
    isAvailable: true,
    ...filters,
  };

  const { page = 1, limit = 10 } = options;

  return await Menu.find(query)
    .populate("category", "name")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });
};

export const getMenuBySlug = async (slug) => {
  return await Menu.findOne({ slug, isAvailable: true }).populate(
    "category",
    "name"
  );
};