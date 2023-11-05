const express = require("express");
const MessageController = require("../controllers/message.controller");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.post('/create', MessageController.postMessage);
router.get('/get-all-message', MessageController.getAllMessage);
router.get('/search', verifyToken, MessageController.getMessage);
router.delete('/delete', verifyToken, MessageController.deleteMessage);

module.exports = router;
