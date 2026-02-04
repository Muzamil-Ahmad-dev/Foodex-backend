import Category from "./category.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};