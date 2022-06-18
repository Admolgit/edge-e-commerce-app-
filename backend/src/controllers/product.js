const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");

const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next();
  });
};

const read = (req, res) => {
  req.product.image = undefined;
  return res.status(200).json(req.product);
};

// Create product and upload file

const createProduct = (req, res) => {
  console.log("Creating product");

  // To handle file upload
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse =
    (req,
    (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

      // Checking for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (!name || description || price || category || quantity || shipping) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // handling the file part

      let product = new Product(fields);

      // console.log(product);

      if (files.image) {
        if (files.image > 1000000) {
          return res.status(400).json({
            error: "Image should not be greater than 1mb",
          });
        }
        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;
      }

      Product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product could not be saved to database",
          });
        }
        res.status(201).json(product);
      });
    });
};

const deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, productDeleted) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong deleting product",
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

const updatedProduct = (req, res) => {
  console.log("Creating product");

  // To handle file upload
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse =
    (req,
    (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

      // Checking for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (!name || description || price || category || quantity || shipping) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // handling the file part

      let product = req.product;
      product = _.extend(product, fields);

      // console.log(product);

      if (files.image) {
        if (files.image > 1000000) {
          return res.status(400).json({
            error: "Image should not be greater than 1mb",
          });
        }
        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;
      }

      Product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product could not be saved to database",
          });
        }
        res.status(201).json(product);
      });
    });
};

// Sell / Arrival
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no param was sent, all product should be returned

const list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : _id;
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {

      if(err) {
        return res.status(400).json({ error: err.message })
      }

      res.json(data)
    })
};

//find products based on the req product category
// other product that has the same category will be returned

const relatedProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({_id: {$ne: req.product}, category: req.product.category})
  .limit(limit)
  .populate("category", "_id name")
  .exec((err, products) => {
    if(err) {
      return res.status(400).json({ error: err.message })
    }

    res.json(products)
  })
}

const listCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if(err) {
      return res.status(400).json({ error: err.message })
    }

    res.json(categories)
  })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

 
const listBySearch = (req, res) => {

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
            error: "Products not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

const productImage = (req, res, next, id) => {
  if(req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType)
    return res.json(req.product.image.data)
  }
  next();
}

module.exports = {
  createProduct,
  productById,
  read,
  deleteProduct,
  updatedProduct,
  list,
  relatedProducts,
  listCategories,
  listBySearch,
  productImage,
};
