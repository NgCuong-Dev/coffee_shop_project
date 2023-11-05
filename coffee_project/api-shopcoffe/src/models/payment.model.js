const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  bankName: {
    type: String,
  },
  bankOwner:{
    type: String,
  },
  accountNumber: {
    type: String,
  },
  image: {
    type: Array,
    required: false,
    default: [],
  },
  
},
{ timestamps: true }
);


module.exports = mongoose.model('payment', PaymentSchema);
