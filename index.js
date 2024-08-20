const express = require('express');
const path=require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { LocalStorage } = require('node-localstorage');

const BK_collection= require('./public/MongoDB/booking')
const collection = require('./public/MongoDB/Mongo')
const app = express();
const port = 3000;
const { required } = require('nodemon/lib/config');

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

app.get('/pack',(req,res)=>{
    let jsonData;
    fs.readFile('./public/dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        try {
            jsonData = JSON.parse(data);
            
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).send('Error parsing JSON data');
        }
    

        // res.render('pack', { packages: matchingPackages, message: null });
        // res.send(jsonData);
        const users = jsonData; // Fetch all users from the collection
        res.render('pack', { users: users });
    });
})

app.get('/admin',(req,res)=>{
    res.render('admin');
})

app.get('/package',(req,res)=>{
    res.render('package');
})

app.get('/fake',(req,res)=>{
    res.render("fake");
})

app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/customer_data', async (req, res) => {
    try {
        const users = await collection.find(); // Fetch all users from the collection
        res.render('customer_data', { users: users }); // Render the 'users' template with the data
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching users");
    }
});


app.get('/signup',(req,res)=>{
    res.render("signup");

})

app.post('/signup', async (req,res)=>{

    const data={
        name: req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    
    const existingUser = await collection.findOne({email : data.email});
    if(existingUser){
        res.send("User already exists");
        console.log("USer already Exist");
    }
    else{
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(data.password,saltRound);
        data.password=hashPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata," user data")
    }

    res.render('index');
});

app.post('/booking', async (req,res)=>{

    const data={
        name: req.body.username,
        email:req.body.email,
        number:req.body.number,
        people:req.body.people,
        childrens:req.body.childrens,
        packageName:req.body.packageName,
        packagePrice:req.body.packagePrice,
        packageDescription:req.body.packageDescription
    }
    
    
    const userdata = await BK_collection.insertMany(data);
    //console.log(userdata," user data")
    
    res.send("Booking Successfull");
    res.render('index');

});

app.get('/booking_data', async (req, res) => {
    try {
        const users = await BK_collection.find(); // Fetch all users from the collection
        res.render('booking_data', { users: users }); // Render the 'users' template with the data
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching users");
    }
});


app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.render("/login");
            return res.status(400).send("Invalid Email or Password");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.render("/login");
            return res.status(400).send("Invalid Password");
        }

        res.render("index"); 
    } catch (e) {
        console.error(e);
        res.render("/login");
        return res.status(500).send("An error occurred during login");
    }
});


app.get('/fake', (req, res) => {
    // fs.readFile('dummy.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('Error reading file');
    //     }
    //     else{
          
    //         res.render('fake');
    //     }
       
    // });
    // fs.readFile('dummy.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file:', err);
    //         return res.status(500).send('Error reading file');
    //     }

    //     try {
    //         // Parse the JSON data
    //         const tourPackages = JSON.parse(data);

    //         // Pass the data to the template
    //         res.render('fake', { tourPackages });
    //     } catch (e) {
    //         console.log('Error processing data:', e);
    //         res.status(500).send('Error processing data');
    //     }
    // });
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

   
    fs.readFile('./public/dummy.json', 'utf8', (err, data) => {
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

        

        fs.writeFile('./public/dummy.json', JSON.stringify(jsonData, null, 2), (err,data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            //alert("Data saved successfully");
            // alert('Sucesfull Adding Package');
            // //window.location.href = "admin.html";
            //res.status(201)('Subscription added successfully.');
           

            
            res.send(`
                <script>
                    alert('Your package is Successfully Added');
                    window.location.href = '/admin';
                </script>
            `);
                //res.send(jsonData);
            
            
        
        });
    });
});





app.get('/search', (req, res) => {
    res.render('search', { packages: [], message: null });
});

app.post('/search', (req, res) => {
    const { packageName } = req.body;

    if (!packageName) {
        return res.status(400).send('Package name is required');
    }

    console.log('Received packageName for search:', packageName);

    fs.readFile('./public/dummy.json', 'utf8', (err, data) => {
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
        
        const matchingPackages = jsonData.filter(item => item.name === packageName);

        //res.redirect('/admin');
        res.render('search', { packages: matchingPackages, message: null });
    });
});

// app.post('/delete', (req, res) => {
//     const { packagePrice } = req.body;

//     if (!packagePrice) {
//         return res.status(400).send('Package price is required');
//     }

//     console.log('Received packagePrice for deletion:', packagePrice);

//     fs.readFile('./public/dummy.json', 'utf8', (err, data) => {
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

//         // Filter out the objects with the given price
//         const filteredData = jsonData.filter(item => item.price !== packagePrice);
        
//         if (filteredData.length === jsonData.length) {
//             // No matching package found
//             //return res.status(404).send('No package found with the specified price');
//             res.redirect('/admin');
//         }

//         fs.writeFile('./public/dummy.json', JSON.stringify(filteredData, null, 2), (err) => {
//             if (err) {
//                 console.error('Error writing file:', err);
//                 return res.status(500).send('Error writing file');
//             }
//             // Redirect back to the current page
//             res.redirect('/admin'); // This redirects to the referring page
            
//         });
//     });
// });
app.post('/delete', (req, res) => {
    const { packagePrice } = req.body;

    if (!packagePrice) {
        return res.status(400).send('Package price is required');
    }

    console.log('Received packagePrice for deletion:', packagePrice);

    fs.readFile('./public/dummy.json', 'utf8', (err, data) => {
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
            // No matching package found, redirecting without alert
            return res.redirect('/admin');
        }

        fs.writeFile('./public/dummy.json', JSON.stringify(filteredData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            // Send a response that includes the alert script and redirection
            res.send(`
                <script>
                    alert('Your package is Successfully Deleted');
                    window.location.href = '/admin';
                </script>
            `);
        });
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
