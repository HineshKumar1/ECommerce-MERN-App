const slugify = require("slugify");
const productModel = require("../models/product");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { title, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    //Validations
    switch (true) {
      case !title:
        return res.status(400).send({ message: "Name is Required!" });

      case !price:
        return res.status(400).send({ message: "price is Required!" });

      case !category:
        return res.status(400).send({ message: "category is Required!" });

      case !quantity:
        return res.status(400).send({ message: "quantity is Required!" });

      case image && image.size > 10000000:
        return res.status(400).send({
          message: "image is required and size should be less then 1Mb",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(title) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contenetType = image.type;
    }
    await product.save();
    res.status(200).send({
      status: true,
      message: "Product add Successfully!",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While add product!",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      status: true,
      message: "Product Fetched Successfully!",
      totalCount: product.length,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching products!",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug }).select("-image")
      .populate("category");
    res.status(200).send({
      status: true,
      message: "Product Fetch Successfully!",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching products!",
    });
  }
};

const getProductImage = async(req,res)=>{
  try {

    const product = await productModel.findById(req.params.pid).select("image");
    if(product.image.data){
      res.set("Content-type",product.image.contenetType);
      return res.status(200).send(product.image.data)
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching product image!",
    });
  }
}

const deleteProduct = async(req,res,next)=>{
  try {
    const {id} = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message:"Product delete successfully"
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status:false,
      message: "Error while delete Product!"
    })
  }
}
module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  getProductImage,
  deleteProduct
};
