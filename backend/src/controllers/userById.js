const User = require("../models/user");

exports.userById = (req, res, next, id) => {

  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    req.profile = user;

    next();
  });
};

// Read and update user profile

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if(err) {
        res.status(400).json({
          error: "You can not change or update this profile"
        })
      }

      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user)
    }
  );
};
