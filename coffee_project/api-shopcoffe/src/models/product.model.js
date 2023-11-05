const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: Array,
    required: false,
    default: [],
  },
  slug:{
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  price: {
    type: Number,
  },
  priceOld: {
    type: Number,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  wording: {
    type: String,
  },
  use: {
    type: String,
  },
  size: {
    type: String,
  },
  note: {
    type: String,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('product', ProductSchema);
