
const Product = require('../../models/product');
const Order = require('../../models/order');
const CP = require('../../models/CustomPrice');
const shortid = require('shortid');
const slugify = require('slugify');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.addProduct = async (req, res, next) => {
  const { name, quantity, category, price, color, ram, memory, cpu, camera, image } = await req.body;


  const product = new Product({
    name: name,
    slug: slugify(name),
    price: price,
    quantity: quantity,
    description: req.body.des,
    color: color,
    ram: ram,
    boNhoTrong: memory,
    heDieuHanh: cpu,
    camera: camera,
    category: category,
    createBy: req.body.user._id,
    imageProduct: image,
    stock: quantity
  });
  product.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error })
    }
    if (data) {
      return res.status(201).json({ product: data })
    }
  })
}
exports.getproductById = async (req, res, next) => {
  const id = req.body.payload;
  if (id) {
    await await Product.find({ _id: id }).select("_id name price quantity slug description category color ram boNhoTrong heDieuHanh camera imageProduct").populate({ path: "category", select: "_id name" }).exec((error, product) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (product) {
        console.log(product);
        res.status(200).json({ product })
      } else {

        return res.status(400).json({ message: "khong tim thay!" });

      }
    })
  } else {

    return res.status(400).json({ message: "Params required!" });
  }
}
exports.deleteById = async (req, res, next) => {
  const id = req.body.id;

  if (id) {
    await Product.deleteOne({ _id: id }).exec((error, resuilt) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (resuilt) {
        res.status(200).json({ message: "deteted successfully !" })
      } else {
        return res.status(400).json({ message: "khong tim thay!" });
      }
    })
  } else {
    return res.status(400).json({ message: "Params required!" })
  }
}
exports.getProducts = async (req, res, next) => {
  const products = await Product.find({}).select("_id name stock daBan price quantity slug description category color ram boNhoTrong heDieuHanh camera imageProduct offer").populate({ path: "category", select: "_id name" }).exec();
  res.status(200).json(products);
}
exports.getTotalProduct = async (req, res, next) => {
  // const date = new Date();
  // const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  // try {
  //   const data = await Order.aggregate([
  //     { $match: { createdAt: { $gte: lastYear } } },
  //     {
  //       $project: {
  //         month: { $month: "$createdAt" },
  //         sales: "$totalAmount",
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$month",
  //         total: { $sum: "$sales" },
  //       },
  //     },
  //   ]);
  //   res.status(200).json(data)
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  const product = req.body.id;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
          items: [{ $elemMatch: { product: product } }]
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$quantity",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
}
exports.SPbanChayNhat = async (req, res, next) => {
  try {
    const product = await Product.aggregate([
      // First Stage

      // Third Stage
      {
        $sort: { daBan: -1 }
      },
      {
        $limit: 1
      }
    ]);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }

}
exports.TOP3SPbanChayNhat = async (req, res, next) => {
  try {
    const product = await Product.aggregate([
      // First Stage

      // Third Stage
      {
        $sort: { daBan: -1 }
      },
      {
        $limit: 3
      }
    ]);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }

}
exports.CustomPrice = async (req, res, next) => {
  try {
    let products = req.body.users;
    var selected = [];
    // if (products) {
    //   products.map((item, index) => {
    //     if (item.isChecked) {
    //       selected.push(item._id)
    //     }
    //   })
    // }
    if (req.body.id) {
      const updateCp = await CP.findOneAndUpdate({ _id: req.body.id }, {
        status: req.body.status === "1" ? true : false,
        productType: req.body.type,
        selecProduct: products,
        value: req.body.value,
        name: req.body.name,
      }, {
        new: true,
      });
      return res.status(200).json(updateCp);
    } else {
      const _cp = new CP({
        name: req.body.name,
        status: req.body.status ? true : false,
        productType: req.body.type,
        selecProduct: selected,
        value: req.body.value
      });
      _cp.save((error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error })
        }
        if (data) {

          return res.status(201).json({ cp: data })
        }
      })
    }
  } catch (error) {

  }
}
exports.getCustomPrice = async (req, res, next) => {
  try {
    const cp = await CP.find({});

    res.status(200).json(cp);
  } catch (error) {

  }
}