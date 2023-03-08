const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
// import crypto from "crypto";

uuid.v1();

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   minlength: 3,
  //   maxlength: 32,
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   unique: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // about: {
  //   type: String,
  //   trim: true,
  // },
  // salt: {
  //   type: String,
  // },
  // role: {
  //   type: Number,
  //   default: 0,
  // },
  // history: {
  //   type: Array,
  //   default: [],
  // },
  firstName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    require: true,
  },
  userName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    // require: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 128,
  },
  terms: {
    type: Boolean,
    default: false,
  },
  rememberMe: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "secret", { expiresIn: "3d" });
  
  return token;
}

let User = mongoose.model("User", userSchema);

module.exports = User;