document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the categories and amounts data from the hidden elements in the DOM
    const categories = JSON.parse(document.getElementById('categories').innerText);  // This should be a string array
    const amounts = JSON.parse(document.getElementById('amounts').innerText);  // This should be a number array

    // Debugging - Print the data to check if it's correct
    console.log('Categories:', categories);  // Should log an array of strings
    console.log('Amounts:', amounts);  // Should log an array of numbers

    // Create the bar chart using Chart.js
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(ctx, {
        type: 'bar', // Bar chart for expense categories
        data: {
            labels: categories,  // Dynamic categories passed from backend (array of strings)
            datasets: [{
                label: 'Total Spending',
                data: amounts,  // Dynamic expense amounts passed from backend
                backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Bar color
                borderColor: 'rgba(54, 162, 235, 1)',  // Border color
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,  // Prevent skipping of labels on the X-axis
                        maxRotation: 45,  // Rotate labels to avoid overlap if needed
                        minRotation: 45   // Ensure the labels are rotated at a fixed angle
                    }
                },
                y: {
                    beginAtZero: true  // Ensure the Y-axis starts at 0
                }
            }
        }
    });
});