const mongoose = require("mongoose");


const connect = mongoose.connect('mongodb://localhost:27017/Login-tut', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Connection error', err);
  });
connect.then(()=>{
    console.log("connected Booking database Sucessfully");
})
.catch((e)=>{
    console.log("Error  ",e);
});

const BookingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Path `username` is required.']
    },
    email:{
        type:String,
        required:[true, 'Path `email` is required.']
    },
    number:{
        type:Number,
        required:[true, 'Path `Number` is required.']
    },
    people:{
        type:Number,
        required:[true, 'Path `people` is required.']
    },
    childrens:{
        type:Number,
        required:false
    },
    packageName:{
        type:String,
        required:[true, 'Path `Package` is required.']
    },
    packagePrice:{
        type:Number,
        required:[true, 'Path `packagePrice` is required.']
    },
    packageDescription:{
        type:String,
        required:[true, 'Path `packageDescription` is required.']
    }
});

const BK_collection = new mongoose.model("booking",BookingSchema);

module.exports = BK_collection;