const ExpenseTrackerModel = require('../model/expensesModel');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await ExpenseTrackerModel.find({ usersTbId: req.user.userId });
        res.status(200).json({ allExpenses: allExpenses });
    } catch (err) {
        console.log('Error in fetching all expenses record with error: ', JSON.stringify(err));
        res.status(500).json({ error: err });
    }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return res.status(400).json({ error: 'Expense Id of Updated user missing' });
        }
        const expense = await ExpenseTrackerModel.findOne({
            _id: id,
            usersTbId: req.user.userId
        });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ updatedUserExpense: expense });
    } catch (error) {
        console.error(`Error in fetching expense by Id: ${error}`);
        res.status(500).json({ error });
    }
};

// Add new expense
exports.addNewExpense = async (req, res) => {
    try {
        const { amount, description, category, amountType } = req.body;
        console.log("hi")
        const usersTbId = req.user.userId;
        console.log("hey")

        if (!amount.trim() || !description.trim() || !category.trim()) {
            throw new Error('All fields mandatory');
        }
        const newExpense = await ExpenseTrackerModel.create({
            amount,
            description,
            category,
            amountType,
            usersTbId
        });
        res.status(201).json({ newAddedExpense: newExpense });
    } catch (err) {
        console.error(`Error in posting new expense: ${err}`);
        res.status(err.status || 500).json({ error: err.message || err });
    }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.trim()) {
            return res.status(400).json({ error: 'Expense Id is missing while deleting.' });
        }
        const delres = await ExpenseTrackerModel.deleteOne({ _id: id, usersTbId: req.user.userId });
        if (delres.deletedCount === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(`Error in deleting expense: ${err}`);
        res.status(500).json({ error: err.message || err });
    }
};

// Update expense
exports.updateExpense = async (req, res) => {
    try {
        const { amount, description, category, amountType } = req.body;
        const { id } = req.params;
        if (!id.trim()) {
            return res.status(400).json({ error: 'Expense Id is missing for update.' });
        }
        if (!amount.trim() || !description || !category) {
            throw new Error('All fields mandatory');
        }
        const result = await ExpenseTrackerModel.updateOne(
            { _id: id, usersTbId: req.user.userId },
            { amount, description, category, amountType }
        );
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(`Error in updating expense: ${err}`);
        res.status(err.status || 500).json({ error: err.message || err });
    }
};
