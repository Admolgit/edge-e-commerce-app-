const Category = require("../models/category");

module.exports.categoryById = (req, res, next, id) => {
  Category.findById({ _id: id }).exec((err, category) => {
    if (err || !category) {
      return res.status(404).json({
        error: "Category does not exist",
      });
    }

    req.category = category;
    next();
  });
};

module.exports.create = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    let category = new Category(req.body);
    let categoryInfo = await category.save();

    return res.status(201).json({
      categoryInfo: categoryInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not created",
      error: error.message,
    });
  }
};

module.exports.read = (req, res) => {
  try {
    res.json(req.category);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err)
      return res.status(400).json({
        message: "Something went wrong,category can not be updated.",
        error: err.message,
      });
    res.json(category);
  });
};

module.exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({
      message: "Category deleted",
    });
  });
};

module.exports.list = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      message: "Categories fetched successfully",
      listsLength: categories.length,
      lists: categories,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Something went wrong",
    });
  }
};
