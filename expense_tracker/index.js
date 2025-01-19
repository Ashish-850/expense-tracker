// Import required modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { Expense, CATEGORY } = require("./models/expense");
const methodOverride = require("method-override");
const app = express();

// Connect to MongoDB using Mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/expense_app")
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch((err) => {
        console.error("Failed to connect to database", err);
    });

// Middleware setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Serve static files (like CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Dashboard Route
// Sample route in your Express app
// Dashboard Route
app.get('/dashboard', async (req, res) => {
    try {
        // Sample aggregation query for expenses by category
        const expenses = await Expense.aggregate([
            {
                $group: {
                    _id: "$expenseFor", // Group by category (expenseFor)
                    totalAmount: { $sum: "$amount" } // Sum the amount spent in each category
                }
            }
        ]);

        // If no expenses found, set categories and amounts to empty arrays
        if (expenses.length === 0) {
            return res.render('dashboard', {
                categories: JSON.stringify([]),
                amounts: JSON.stringify([]),
                expense: []
            });
        }

        // Extract category names and total amounts for the chart
        const categories = expenses.map(exp => exp._id);
        const amounts = expenses.map(exp => exp.totalAmount);

        // Fetch all expenses for the table (for display)
        const allExpenses = await Expense.find();

        // Pass the data to the EJS view
        res.render('dashboard', {
            categories: JSON.stringify(categories),
            amounts: JSON.stringify(amounts),
            expense: allExpenses // Pass expenses to the EJS view
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add Expense Routes
app.get("/add_expense", (req, res) => {
    res.render("add_expense.ejs", { category: CATEGORY });
});

app.post("/add_expense", async (req, res) => {
    try {
        const expenseDetail = new Expense(req.body);
        await expenseDetail.save();
        res.redirect("/dashboard");
    } catch (err) {
        console.error("Error adding expense:", err);
        res.status(500).send("Error adding expense.");
    }
});

// All Expenses Route with Filtering
app.get("/all_expenses", async (req, res) => {
    const { trip, date } = req.query;
    const filter = {};

    if (trip) filter.trip = trip;
    if (date) filter.expenseOn = new Date(date);

    try {
        const expenses = await Expense.find(filter).sort({ expenseOn: -1 });
        const trips = await Expense.distinct("trip");
        res.render("allExpenses.ejs", {
            expenses,
            trips,
            query: req.query,
            message: expenses.length ? null : "No expenses found for the selected filters.",
        });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).send("Error fetching expenses.");
    }
});

// Edit Expense Routes
app.get("/edit-expense/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const foundExpense = await Expense.findById(id);
        if (!foundExpense) {
            return res.status(404).send("Expense not found.");
        }
        res.render("edit-expense.ejs", { foundExpense, category: CATEGORY });
    } catch (err) {
        console.error("Error fetching expense:", err);
        res.status(400).send("Invalid Expense ID.");
    }
});

app.put("/edit-expense/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.expenseOn) {
            req.body.expenseOn = new Date(req.body.expenseOn);
        }
        await Expense.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.redirect("/all_expenses");
    } catch (err) {
        console.error("Error updating expense:", err);
        res.status(500).send("Error updating expense.");
    }
});

// Delete Expense Route
app.delete("/delete-expense/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.redirect("/all_expenses");
    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).send("Error deleting expense.");
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});