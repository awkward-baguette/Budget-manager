const Budget = require('../models/Budget');

exports.getBudgets = async (req, res) => {
  const budgets = await Budget.find({ owner: req.user.userId });
  res.json(budgets);
};

exports.createBudget = async (req, res) => {
  const budget = new Budget({ ...req.body, owner: req.user.userId });
  await budget.save();
  res.status(201).json(budget);
};

exports.updateBudget = async (req, res) => {
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.userId },
    req.body,
    { new: true }
  );
  if (!budget) return res.status(404).json({ message: "Budget not found." });
  res.json(budget);
};

exports.deleteBudget = async (req, res) => {
  const result = await Budget.deleteOne({ _id: req.params.id, owner: req.user.userId });
  if (result.deletedCount === 0) return res.status(404).json({ message: "Budget not found." });
  res.json({ message: "Budget deleted." });
};