const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    default: null,
  },
  content: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });
const CommentSchema = mongoose.Schema(
  {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    content: {
      type: String,
    },
    replies: [replySchema],
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
