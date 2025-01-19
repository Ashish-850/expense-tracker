const mongoose = require("mongoose");
const { Expense, CATEGORY } = require("./models/expense");

// Connect to MongoDB using Mongoose
mongoose
    .connect("mongodb://127.0.0.1:27017/expense_app") // Connect to the 'expense_app' database
    .then(() => {
        console.log("Mongo connection open"); // Log success message when connected
    })
    .catch((err) => {
        console.log("Failed to connect to database"); // Log error message if connection fails
        console.log(err); // Display the error details
    });

// Insert multiple documents
Expense.insertMany([
    { trip: "Hyderabad", expense: "From Bangalore to Hyderabad", amount: 2500, expenseFor: "Bus", expenseOn: new Date("2025-01-06") },
    { trip: "Hyderabad", expense: "From Hyderabad to hotel", amount: 500, expenseFor: "Cab", expenseOn: new Date("2025-01-07") },
    { trip: "Hyderabad", expense: "From hotel to Ralpro", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-07") },
    { trip: "Hyderabad", expense: "From Ralpro to hotel", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-07") },
    { trip: "Hyderabad", expense: "Food", amount: 350, expenseFor: "Food", expenseOn: new Date("2025-01-07") },
    { trip: "Hyderabad", expense: "From hotel to Ralpro", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-08") },
    { trip: "Hyderabad", expense: "From Ralpro to hotel", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-08") },
    { trip: "Hyderabad", expense: "Food", amount: 400, expenseFor: "Food", expenseOn: new Date("2025-01-07") },
    { trip: "Hyderabad", expense: "From hotel to Ralpro", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-08") },
    { trip: "Hyderabad", expense: "From Ralpro to hotel", amount: 300, expenseFor: "Auto", expenseOn: new Date("2025-01-08") },
    { trip: "Hyderabad", expense: "Food", amount: 280, expenseFor: "Food", expenseOn: new Date("2025-01-08") },
])
    .then(data => {
        console.log("Expenses inserted:", data);
    })
    .catch(error => {
        console.log("Error inserting expenses:", error);
    });