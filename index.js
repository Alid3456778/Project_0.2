// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// // app.set('view engine','ejs');
// //app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.get('/',(req,res)=>{
//     res.render('index');
// });

// app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port}`);
// });
// server.js
const express = require('express');
const app = express();
const port = 3000;




// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to render the index.ejs file
app.get('/', (req, res) => {
    localStorage.clear();
    res.render('index');
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
