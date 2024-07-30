var express = require('express');
var router = express.Router();
const UserModel = require("./users");


/* GET home page. */
// router.get('/', function (req, res) {
//   res.render('index');
// });

// //CRUB MONGODB
// router.get('/create', async function (req, res) {
//   const createdUser = await UserModel.create({
//     username: "John",
//     age: 19,
//     name: "john"
//   });
//   res.send(createdUser);
// });

// ///finding
// router.get('/alluser', async function (req, res) {
//   let allUsers = await UserModel.find()
//   res.send(allUsers);
// });

// //delete
// router.get('/delete', async function (req, res) {
//   let duser = await UserModel.findOneAndDelete({
//     username:"John"
//   });
//   res.send(duser);
// });

// router.get('/', function (req, res) {
//   req.session.ban = true;
//   res.render('index');
// });

// router.get('/checkban', function (req, res) {
//   console.log(req.session);
//   res.send("chech console");
// });

router.get('/', function (req, res) {
       res.cookie('name', 'ahetesham');
       res.send("done")
     });

module.exports = router;
