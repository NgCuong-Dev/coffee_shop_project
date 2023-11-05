const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  email: {
    type: String,
  },
},
  { timestamps: true }
);


module.exports = mongoose.model('message', MessageSchema);
