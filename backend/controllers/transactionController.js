const Transaction = require('../models/Transaction');

// Get all transactions for logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ owner: req.user.userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new transaction
// exports.createTransaction = async (req, res) => {
//   try {
//     const transaction = new Transaction({ ...req.body, owner: req.user.userId });
//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// server/controllers/transactionsController.js


exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      owner: req.user.userId // must come from auth middleware
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid transaction data", error: err.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const result = await Transaction.deleteOne({ _id: req.params.id, owner: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Transaction not found." });
    res.json({ message: "Transaction deleted." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
