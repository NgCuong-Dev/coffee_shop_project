const MessageSchema = require("../models/message.model");

const postMessage = async (req, res, next) => {
  try {
    const { email } = req.body;
    const createMessage = await MessageSchema.create({ email });
    return res.status(200).json(createMessage);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    if (email) {
      query = { email: { $regex: email, $options: "i" } };
    }

    const searchMessage = await MessageSchema.find(query);

    return res.status(200).json(searchMessage);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllMessage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = {}; 
    const getAllMessages = await MessageSchema.find(query).skip(skip).limit(limit).sort({ __v: -1 });
    const countAllMessages = await MessageSchema.countDocuments(query);
    return res.status(200).json({
      count: countAllMessages,
      page: page,
      messages: getAllMessages,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.body;
    for (const deId of id) {
      await MessageSchema.deleteOne({ _id: deId });
    }
    return res.status(200).json("Đã xóa xong");
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  postMessage,
  getAllMessage,
  getMessage,
  deleteMessage
};
