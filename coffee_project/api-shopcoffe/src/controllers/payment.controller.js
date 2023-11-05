const PaymentSchema = require("../models/payment.model");

const postPayment = async (req, res) => {
  try {
    const { bankName, accountNumber, bankOwner } = req.body;
    const image = req.files && req.files[0] ? req.files[0].path : "";
    const createPayment = await PaymentSchema.create({
      bankName: bankName,
      accountNumber: accountNumber,
      image: image,
      bankOwner: bankOwner,
    });
    return res.status(200).json(createPayment);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getPayment = async (req, res) => {
  try {
    const { bankName } = req.query;
    let query = {};

    if (bankName) {
      query = { bankName: { $regex: bankName, $options: "i" } };
    }

    const searchPayment = await PaymentSchema.find(query);

    return res.status(200).json(searchPayment);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllPayment = async (req, res) => {
  try {
    const getAllPayments = await PaymentSchema.find();
    return res.status(200).json({
      payments: getAllPayments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.Payment });
  }
};
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    await PaymentSchema.findByIdAndDelete(paymentId);
    return res.status(200).json("Đã xóa xong");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const { ...accountNumber } = req.body;
    const updatedPayment = await PaymentSchema.findByIdAndUpdate(
      paymentId,
      { ...accountNumber },
      { new: true }
    );

    return res.status(200).json({
      payment: updatedPayment,
      oke: "Đã cập nhật xong",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  postPayment,
  getAllPayment,
  getPayment,
  deletePayment,
  updatePayment,
};
