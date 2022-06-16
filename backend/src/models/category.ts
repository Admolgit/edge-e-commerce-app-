import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 32,
  },
}, {
  timestamps: true,
});

let User = mongoose.model("Category", categorySchema);

export default User;