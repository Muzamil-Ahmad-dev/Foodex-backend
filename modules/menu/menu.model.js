import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      type: String, // CDN / Cloudinary URL
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    spiceLevel: {
      type: String,
      enum: ["mild", "medium", "hot"],
      default: "mild",
    },

    stock: {
      type: Number,
      default: 100,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin
    },
  },
  { timestamps: true }
);

menuSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

export default mongoose.model("Menu", menuSchema);