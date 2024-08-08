const express = require('express');
const path=require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');


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

app.get('/admin',(req,res)=>{
    res.render('admin');
})

app.get('/package',(req,res)=>{
    res.render('package');
})

// app.get('/fake',(req,res)=>{
//     res.render("fake");
// })

app.get('/login',(req,res)=>{
    res.render("login");
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


})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.render("login");
            return res.status(400).send("Invalid Email or Password");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.render("login");
            return res.status(400).send("Invalid Password");
        }

        res.render("index"); 
    } catch (e) {
        console.error(e);
        res.render("login");
        return res.status(500).send("An error occurred during login");
    }
});


app.get('/fake', (req, res) => {
    fs.readFile('dummy.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.render("fake");
        //res.json(JSON.parse(data));
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
        
        const matchingPackages = jsonData.filter(item => item.name === packageName);

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
