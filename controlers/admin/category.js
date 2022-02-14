const Category = require('../../models/category');
const slugify = require('slugify');
const shortid = require('shortid');
const cloudinary = require('cloudinary');
const fs = require('fs');
exports.addCategory = (req, res, next) => {

  const category = new Category({
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    createBy: req.body.user._id,
    categoryImage: req.body.image,
    status: req.body.status
  });
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (data) {
      return res.status(201).json({
        category
      })
    }
  })
}
exports.getCategories = (req, res, next) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      return res.status(200).json(categories);
    }
  })
}
exports.getCategoryById = async (req, res, next) => {
  const id = req.body.payload;
  if (id) {
    await Category.findOne({ _id: id }).exec((err, categ) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (categ) {
        return res.status(200).json({ categ });
      }
    })
  }
}
exports.updateCategory = async (req, res, next) => {
  const id = req.params['id'];
  const name = req.body.name;
  const status = req.body.status;
  const updatecategory = await Category.findOneAndUpdate({ _id: id }, { name: name, status: status }, {
    new: true,
  });
  return res.status(200).json(updatecategory);
}
exports.deleteCategory = async (req, res, next) => {
  const productId = req.body.payload
  await Category.deleteOne({ _id: productId });
  return res.status(200).json({
    message: "deleted category successfully!"
  })
}
