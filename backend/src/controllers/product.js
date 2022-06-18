
const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");

const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next()
  })
}

const read = (req, res) => {
  req.product.image = undefined;
  return res.status(200).json(req.product)
}

// Create product and upload file

const createProduct = (req, res) => {

  console.log("Creating product")

  // To handle file upload
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse = (req, (err, fields, files) => {

    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    // Checking for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if(!name || description || price || category || quantity || shipping) {
      return res.status(400).json({error: "All fields are required"})
    }

    // handling the file part

    let product = new Product(fields);

    // console.log(product);

    if(files.image) {
      if(files.image > 1000000) {
        return res.status(400).json({
          error: "Image should not be greater than 1mb"
        });
      }
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    Product.save((err, product) => {
      if(err) {
        return res.status(400).json({
          error: "Product could not be saved to database"
        });
      }
      res.status(201).json(product);
    });
    
  });
    
}

const deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, productDeleted) => {
    if(err) {
      return res.status(400).json({
        error: "Something went wrong deleting product"
      });
    }
    res.json({
      "message": "Product deleted successfully"
    })
  });
}

const updatedProduct = (req, res) => {

  console.log("Creating product")

  // To handle file upload
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse = (req, (err, fields, files) => {

    if(err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    // Checking for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if(!name || description || price || category || quantity || shipping) {
      return res.status(400).json({error: "All fields are required"})
    }

    // handling the file part

    let product = req.product;
    product = _.extend(product, fields)

    // console.log(product);

    if(files.image) {
      if(files.image > 1000000) {
        return res.status(400).json({
          error: "Image should not be greater than 1mb"
        });
      }
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    Product.save((err, product) => {
      if(err) {
        return res.status(400).json({
          error: "Product could not be saved to database"
        });
      }
      res.status(201).json(product);
    });
    
  });
    
}

module.exports = { createProduct, productById, read, deleteProduct, updatedProduct };