const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); // Authorization middleware
const { validate } = require("../Auth/inputValidator");
const User = require("../models/user");

dotenv.config();

exports.signup = async (req, res, next) => {
  let body = req.body;
  let user = await User.findOne({ email: body.email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  let uniqueUser = new User({ ...body });
  const salt = await bcrypt.genSalt(10);
  uniqueUser.password = await bcrypt.hash(body.password, salt);

  try {
    let userInfo = await uniqueUser.save();

    return res.status(201).send({
      userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    validate(req.body);

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).json("Invalid email or password");

    const token = await user.generateAuthToken();

    res.cookie("t", token);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

exports.Auth = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Using Config module to read token validities.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = User.findById(decoded.id).select("-password");

      req.user = user;

      const { id, name } = decoded;

      req.user = { id, name };

      next();
    } catch (error) {
      return res.status(400).json("Invalid token");
    }
  }

  if (!token) {
    return res.status(401).json("You are not authorized");
  }

  // next()
};

exports.signout = (req, res, next) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signout successful",
  });
};

exports.isAuth = (req, res, next, id) => {
  let user = req.profile === req.user.id;
  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res
      .status(403)
      .json({ error: "Access denied, You are not an admin" });
  }
  next();
};
