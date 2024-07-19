const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
 });


//  const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// // Parse JSON bodies
// app.use(express.json());

// // Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

// // Define a route to render the index.ejs file
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });