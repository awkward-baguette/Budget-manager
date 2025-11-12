const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const { budgetId } = req.query;
    const query = { owner: req.user.userId };
    if (budgetId) query.budgetId = budgetId;
    const expenses = await Expense.find(query);
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses." });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      owner: req.user._id,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Failed to add expense." });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    console.log("req.user:", req.user); // <-- Add this line
    console.log("req.params.id:", req.params.id);
    console.log("req.body:", req.body);
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found." });
    res.json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Failed to update expense." });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.deleteOne({ _id: req.params.id, owner: req.user.userId });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Expense not found." });
    res.json({ message: "Expense deleted." });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Failed to delete expense." });
  }
};