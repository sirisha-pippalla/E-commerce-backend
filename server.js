const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs') //this is core node js modules(file system(fs)--> this will give access the file system)
require('dotenv').config()

//import routes
//const authRoutes = require('./routes/auth');

//app
const app = express();


//database connection
mongoose.connect(process.env.DATABASE) 
.then(() => console.log("DB CONNECTED SUCCESSFULLY"))
.catch((err) => console.log("DB CONNECTION ERROR", err))


//middlewares  --> middlewares are basically a function that runs in between i.e., before the app does something for eg:get the request from some URL like post
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}))  //json data is the way our server and client will communicate so we get json data and this will parse json data to javascript object so that can process the data
//limit:"2mb" --> if your clent is sending the data that is be bigger than 2mb their will bw an errror.(this is completely optional)
app.use(cors());
//routes middleware
//app.use('/api', authRoutes);
readdirSync("./routes").map((r)=>
app.use("/api", require("./routes/" + r)));
//readdirSync --> its is read the routes directories. here we take math function in this math takes a function as a argument, this function loop througn each route(r) in routes folder.




//Port
const port = process.env.PORT || 8000;
app.listen(port, ()=>(console.log(`Server is running on ${port}`)))