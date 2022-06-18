const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 32,
  },
  description: {
    type: String,
    required: true,
    maxlength: 3200,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 32,
    trim: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
    maxlength: 32,
  },
  quantity: {
    type: Number,
  },
  // image: {
  //   data: Buffer,
  //   contentType: String,
  // },
  shipping: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

let Product = mongoose.model("Product", productSchema);

module.exports = Product;