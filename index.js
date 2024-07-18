// const express = require('express');
// const app = express();
// const port = 3000;

// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// // Define a route to render the index.ejs file
// app.get('/', (req, res) => {
//     res.render('index');
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});
function readDataFile() {
    const dataPath = path.join(__dirname, 'data.json');
    try {
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]', 'utf8');
        }
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
}

// Define a route to render the admin.ejs file
app.get('/admin', (req, res) => {
    const data = readDataFile();
    res.render('admin', { packages: data });
});

// Route to add a new package
app.post('/admin/add', (req, res) => {
    const data = readDataFile();
    const newPackage = req.body;
    data.push(newPackage);
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
    res.redirect('/admin');
});

// Route to delete a package
app.post('/admin/delete/:id', (req, res) => {
    const data = readDataFile();
    const id = parseInt(req.params.id);
    data.splice(id, 1);
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
    res.redirect('/admin');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});