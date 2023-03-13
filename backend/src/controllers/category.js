const Category = require('../models/category');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      })
    }

    req.category = category;
    next()
  })
}

exports.create = async (req, res, next) => {
  try {
    let category = new Category(req.body);
    let categoryInfo = await category.save();
    res.status(201).json({
      categoryInfo: categoryInfo,
    });
  }
  catch (error) {
    res.status(400).json({
      error: "Not created",
    });
  }
}

exports.read = (req, res) => {
  res.json(req.category)
}

exports.updateProduct = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if(err) return res.status(400).json({message: "Something went wrong,category can not be updated."})
    res.json(category)
  })
}

exports.deleteProduct = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if(err) return res.status(400).json({error: err.message})
    res.json({
      message: "Category deleted"
    })
  })
}

exports.list = (req, res) => {
  const categories = Category.find();

  res.status(200).json({lists: categories});

}