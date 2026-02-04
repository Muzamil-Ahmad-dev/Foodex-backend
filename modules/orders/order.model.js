import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'], 
      default: 'Pending' 
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    deliveryAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);