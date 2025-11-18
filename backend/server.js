const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const billsRoutes = require("./routes/bills");
const settingsRoutes = require("./routes/settingsRoutes");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/budgetmanager", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => { console.log('Connected to MongoDB'); });

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

app.use(cors());
app.use(bodyParser.json());

// ----- Model Definitions -----
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model("User", userSchema);

const budgetSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Budget = mongoose.model("Budget", budgetSchema);

const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Expense = mongoose.model("Expense", expenseSchema);

// ----- Authentication Middleware -----
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: "No token found" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

// ----- Auth Routes -----

// Register
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ message: "Error registering", error: err });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Wrong credentials." });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});

// ----- CRUD APIs (Protected) -----

// Get budgets for a user
app.get('/api/budgets', authenticateToken, async (req, res) => {
    const budgets = await Budget.find({ owner: req.user.userId });
    res.json(budgets);
});

// Add new budget
app.post('/api/budgets', authenticateToken, async (req, res) => {
    const budget = new Budget({ ...req.body, owner: req.user.userId });
    await budget.save();
    res.status(201).json(budget);
});

// Update a budget
app.put('/api/budgets/:id', authenticateToken, async (req, res) => {
    const budget = await Budget.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.userId },
        req.body,
        { new: true }
    );
    if (!budget) return res.status(404).json({ message: "Budget not found." });
    res.json(budget);
});

// Delete a budget
app.delete('/api/budgets/:id', authenticateToken, async (req, res) => {
    const result = await Budget.deleteOne({ _id: req.params.id, owner: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Budget not found." });
    res.json({ message: "Budget deleted." });
});

// Get expenses for a user/budget
app.get('/api/expenses', authenticateToken, async (req, res) => {
    const { budgetId } = req.query;
    const query = { owner: req.user.userId };
    if (budgetId) query.budgetId = budgetId;
    const expenses = await Expense.find(query);
    res.json(expenses);
});

// Add new expense
app.post('/api/expenses', authenticateToken, async (req, res) => {
    const expense = new Expense({ ...req.body, owner: req.user.userId });
    await expense.save();
    res.status(201).json(expense);
});

// Update expense
app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
    const expense = await Expense.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.userId },
        req.body,
        { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found." });
    res.json(expense);
});

// Delete expense
app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
    const result = await Expense.deleteOne({ _id: req.params.id, owner: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Expense not found." });
    res.json({ message: "Expense deleted." });
});

// Home route
app.get('/', (req, res) => {
    res.send('Budget Manager API is running!');
});
app.use("/api/bills", billsRoutes);
app.use("/api", settingsRoutes);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

