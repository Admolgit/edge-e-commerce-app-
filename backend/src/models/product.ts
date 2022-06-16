import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

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
  image: {
    data: Buffer,
    required: true,
    contentType: String,
  },
  shipping: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

let User = mongoose.model("Product", productSchema);

export default User;