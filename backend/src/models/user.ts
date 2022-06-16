import mongoose from "mongoose";
const uuid = require("uuid");
import jwt from "jsonwebtoken";
// import crypto from "crypto";

uuid.v1();
console.log(uuid.v1());

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    trim: true,
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "secret", { expiresIn: "3d" });
  
  return token;
}

let User = mongoose.model("User", userSchema);

export default User;