
const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const newExpense = await Expense.create({ name, amount });
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.destroy();
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
