import Joi from 'joi';

export const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      menuItem: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      price: Joi.number().required(),
    })
  ).required(),
  totalAmount: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  contactNumber: Joi.string().required(),
  status: Joi.string().valid('Pending','Preparing','Out for Delivery','Delivered','Cancelled'),
  paymentStatus: Joi.string().valid('Pending','Paid','Failed'),
});