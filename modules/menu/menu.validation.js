import Joi from "joi";

export const createMenuSchema = Joi.object({
  name: Joi.string().min(3).max(120).required(),
  description: Joi.string().max(500),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  discountPrice: Joi.number().min(0),
  image: Joi.string().uri(),
  isVeg: Joi.boolean(),
  spiceLevel: Joi.string().valid("mild", "medium", "hot"),
  stock: Joi.number().min(0),
});

export const updateMenuSchema = Joi.object({
  name: Joi.string().min(3).max(120),
  description: Joi.string().max(500),
  price: Joi.number().positive(),
  discountPrice: Joi.number().min(0),
  image: Joi.string().uri(),
  isAvailable: Joi.boolean(),
  stock: Joi.number().min(0),
});