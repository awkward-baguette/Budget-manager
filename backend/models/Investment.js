const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
    ProfitLoss: { type: Number, required: true },
    flag: { type: String, enum: ["profit", "loss"], required: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investment", InvestmentSchema);
