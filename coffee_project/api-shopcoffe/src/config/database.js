const config = require('./config');
const mongoose = require('mongoose');
const {
  CommentSchema,
  ContactSchema,
  UserSchema,
  MessageSchema,
  ProductSchema,
  PaymentSchema,
  CategorySchema,
  OrderSchema
} = require('../models');

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => CommentSchema.createIndexes())
  .then(() => ContactSchema.createIndexes())
  .then(() => UserSchema.createIndexes())
  .then(() => MessageSchema.createIndexes())
  .then(() => ProductSchema.createIndexes())
  .then(() => PaymentSchema.createIndexes())
  .then(() => CategorySchema.createIndexes())
  .then(() => OrderSchema.createIndexes())
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((error) =>
    console.log(`❗can not connect to database, ${error}`, error.message),
  );
