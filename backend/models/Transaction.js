// server/models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  mode: { type: String },
  type: { type: String, enum: ["income", "expense"], default: "expense" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
