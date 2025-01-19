const mongoose = require("mongoose");

const CATEGORY = ["Food", "Cab", "Bus", "Auto"];

const expenseSchema = new mongoose.Schema({
    trip: {
        type: String,
        required: true
    },
    expense: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    expenseFor: {
        type: String,
        required: true,
        enum: CATEGORY,
    },
    expenseOn: {
        type: Date,
        required: true,
    }
})

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = { Expense, CATEGORY };