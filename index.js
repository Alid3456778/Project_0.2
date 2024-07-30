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


app.get('/fake', (req, res) => {
    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
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
            // alert('Sucesfull Adding Package');
            // //window.location.href = "admin.html";
        
        });
    });
});

// Delete a package by package name

// Delete a package by package name
// app.post('/delete', (req, res) => {
//     const { packageName } = req.body;

//     if (!packageName) {
//         return res.status(400).send('Package name is required');
//     }

//     console.log('Received packageName:', packageName); // Log the incoming packageName

//     fs.readFile('dummy.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return res.status(500).send('Error reading file');
//         }

//         let jsonData;
//         try {
//             jsonData = JSON.parse(data);
//         } catch (parseError) {
//             console.error('Error parsing JSON data:', parseError);
//             return res.status(500).send('Error parsing JSON data');
//         }

//         console.log('Current JSON data:', jsonData); // Log the content of JSON file

//         // Filter out the objects with the given name
//         const filteredData = jsonData.filter(item => item.name !== packageName);

//         if (filteredData.length === jsonData.length) {
//             // No matching package found
//             return res.status(404).send('Package not found');
//         }

//         fs.writeFile('dummy.json', JSON.stringify(filteredData, null, 2), (err) => {
//             if (err) {
//                 console.error('Error writing file:', err);
//                 return res.status(500).send('Error writing file');
//             }
//             res.send('Data deleted successfully');
//         });
//     });
// });
app.get('/search', (req, res) => {
    res.render('search', { packages: [], message: null });
});

app.post('/search', (req, res) => {
    const { packageName } = req.body;

    if (!packageName) {
        return res.status(400).send('Package name is required');
    }

    console.log('Received packageName for search:', packageName);

    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).send('Error parsing JSON data');
        }
        
        // Find the packages with the given name
        const matchingPackages = jsonData.filter(item => item.name === packageName);

        // Render the results using EJS with a message
        res.render('search', { packages: matchingPackages, message: null });
    });
});

app.post('/delete', (req, res) => {
    const { packagePrice } = req.body;

    if (!packagePrice) {
        return res.status(400).send('Package price is required');
    }

    console.log('Received packagePrice for deletion:', packagePrice);

    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).send('Error parsing JSON data');
        }

        // Filter out the objects with the given price
        const filteredData = jsonData.filter(item => item.price !== packagePrice);
        
        if (filteredData.length === jsonData.length) {
            // No matching package found
            return res.status(404).send('Deleyed Sucesfully');
            
        }

        fs.writeFile('dummy.json', JSON.stringify(filteredData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            // Redirect back to the search page with a deletion success message
            res.redirect('/search', '&message=deleted');
        });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
