const ContactSchema = require('./contact.model');
const CommentSchema = require('./comment.model');
const UserSchema = require('./user.model');
const MessageSchema = require('./message.model');
const ProductSchema = require('./product.model');
const PaymentSchema = require('./payment.model');
const CategorySchema = require('./category.model');
const OrderSchema = require('./order.model');
const CTRL = {
  ContactSchema,
  CommentSchema,
  UserSchema,
  MessageSchema,
  ProductSchema,
  PaymentSchema,
  CategorySchema,
  OrderSchema
};
module.exports = CTRL;
