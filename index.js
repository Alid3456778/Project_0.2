const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

// Add a new package
app.post('/admin', (req, res) => {
    const { name, descp, price, pic,best_time_to_vist,top_attraction,activities,local_dishes,language,currency } = req.body;

    const newData = {
        name: name,
        description: descp,
        price: price,
        image: pic,
        best_time_to_vist:best_time_to_vist,
        top_attraction:top_attraction,
        activities:activities,
        local_dishes:local_dishes,
        language:language,
        currency:currency  
    };

    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Error parsing JSON data');
        }
        
        jsonData.push(newData);

        fs.writeFile('dummy.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            res.send('Data saved successfully');
        });
    });
});

// Delete a package by package name

// Delete a package by package name
app.post('/delete', (req, res) => {
    const { packageName } = req.body;

    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Error parsing JSON data');
        }

        // Filter out the package with the given name
        const updatedJsonData = jsonData.filter(item => item.package !== packageName);

        if (updatedJsonData.length === jsonData.length) {
            // No matching package found
            return res.status(404).send('Package not found');
        }

        fs.writeFile('dummy.json', JSON.stringify(updatedJsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            res.send('Data deleted successfully');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
