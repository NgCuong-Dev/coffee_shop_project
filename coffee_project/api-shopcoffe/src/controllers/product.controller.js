const ProductSchema = require("../models/product.model");
const CategorySchema = require("../models/category.model");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify"); // Import slugify

const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, priceOld, quantity, wording, use, size, note } = req.body;
    const image = req.files && req.files[0] ? req.files[0].path : '';
    const slugs = slugify(title, { lower: true });
    const randomPart = uuidv4();
    const slug = `${slugs}-${randomPart}`;

    const createProduct = await ProductSchema.create({ title, slug, description, category, price, priceOld, quantity, wording, use, size, note, image });
    return res.status(200).json(createProduct);
  } catch (err) {
    return res.status(400).json(err);
  }
};


const searchProduct = async (req, res) => {
  try {
    const { title } = req.query;
    let query = {};

    if (title) {
      query = { title: { $regex: title, $options: "i" } };
    }

    const searchProduct = await ProductSchema.find(query);

    return res.status(200).json(searchProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const getAllProducts = await ProductSchema.find().populate('category').sort({ __v: -1 });
    return res.status(200).json({
      Products: getAllProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.Product });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const slug = req.query.slug;

    const product = await ProductSchema.findOne({ slug });

    if (!product) {
      return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Lỗi server' });
  }
};


const getProductsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categoryId = req.query.categoryId;

    const category = await CategorySchema.findById(categoryId);

    if (!category) {
      return res.status(404).json({ msg: 'Danh mục không tồn tại' });
    }

    const query = { category: categoryId };
    
    const productsInCategory = await ProductSchema.find(query)
    .skip(skip).limit(limit).sort({ __v: -1 });

    const countAllProducts = await ProductSchema.countDocuments(query);

    return res.status(200).json({
      category: category.nameCategory,
      page: page,
      limit: limit,
      count: countAllProducts,
      products: productsInCategory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Lỗi server' });
  }
};


const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;
    if (req.files && req.files[0] && req.files[0].path) {
      updatedData.image = req.files[0].path;
    }
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        ok: false,
        errMessage: 'Không có dữ liệu để cập nhật.',
      });
    }
    const product = await ProductSchema.findByIdAndUpdate(productId, updatedData, { new: true });
    const updatedProduct = await product.save();

    return res.status(200).json({
      ok: true,
      product: updatedProduct});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Lỗi server' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    for (const deId of id) {
      await ProductSchema.deleteOne({ _id: deId });
    }
    return res.status(200).json("Đã xóa xong");
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductsByCategory,
  searchProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct
};
