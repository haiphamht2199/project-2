const Product = require('../../models/product');
const Category = require('../../models/category');
const CP = require('../../models/CustomPrice');
exports.getProducts = async (req, res, next) => {
  const products = await Product.find({}).select("_id name stock daBan price quantity slug reviews  category imageProduct offer").populate({ path: "category", select: "_id name" }).exec();
  res.status(200).json(products);
}
exports.getProduct = async (req, res, next) => {
  let id = req.body.id
  if (id) {
    await Product.find({ _id: id }).select("_id name price quantity slug description category reviews color ram boNhoTrong heDieuHanh camera imageProduct stock offer").populate({ path: "reviews.userid", select: "_id firstName lastName  " }).exec((error, product) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (product) {
        res.status(200).json({ product })
      } else {

        return res.status(400).json({ message: "khong tim thay!" });

      }
    })
  } else {

    return res.status(400).json({ message: "Params required!" });
  }
}
exports.getCategories = async (req, res, next) => {
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
  Product.find({ category: req.body.id }).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(200).json("khong tim thay")
    }
  })
}
exports.getRule = async (req, res, next) => {
  try {
    const cp = await CP.find({});

    res.status(200).json(cp);
  } catch (error) {

  }
}