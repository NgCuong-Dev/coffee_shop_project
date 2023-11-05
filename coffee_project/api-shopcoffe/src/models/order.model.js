const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    complete: { type: String, default: 'pending' },
    email: { type: String, default: '' },
    phone: {
      type: String,
    },
    tinh: {
      type: String,
    },
    quan: {
      type: String,
    },
    xa: {
      type: String,
    },
    code: {
      type: String,
    },
    mota: {
      type: String,
    },
    note: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: false,
    },
    soDon: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    Sum: {
      type: Number,
    },
    products: [{ type: Object, required: true }],
    isPayment: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('order', OrderSchema);
