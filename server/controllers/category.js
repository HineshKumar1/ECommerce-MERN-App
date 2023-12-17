const categoryModel = require("../models/category");
const slugify = require("slugify");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Please Enter Category name!" });
    }
    const exists = await categoryModel.findOne({ name });
    if (exists) {
      return res.status(400).send({ message: "Already Exists!" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      status: true,
      message: "Category created successfully!",
      data: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Failed to create category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModel.findByIdAndUpdate(id, {
      name,
      slug: slugify(name),
    });

    res.status(200).send({
      status: true,
      message: "Category updated successfully!",
      data: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error while updating category",
    });
  }
};

const getCategories = async(req,res)=>{
    try {
        const category = await categoryModel.find();
        res.status(200).send({
            status:true,
            message: "Category fetch successfully",
            data:category
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: "Failed to create category",
        });
    }

}
module.exports = {
  createCategory,
  updateCategory,
  getCategories
};
