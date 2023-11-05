const express = require("express");
const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/get-payment", paymentController.getAllPayment);
router.post("/create", upload.Image("image"), paymentController.postPayment);
router.patch(
  "/update/:paymentId",
  verifyToken,
  paymentController.updatePayment
);
router.get("/search", verifyToken, paymentController.getPayment);
router.delete(
  "/delete/:paymentId",
  verifyToken,
  paymentController.deletePayment
);

module.exports = router;
