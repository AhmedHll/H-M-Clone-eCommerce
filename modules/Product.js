const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      requried: true,
    },
    categories: {
      type: Array,
      requried: true,
    },

    date: {
      type: String,
      requried: true,
    },
  },
  { strict: false, timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
