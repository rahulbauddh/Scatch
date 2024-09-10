const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const index = require("./routes/index");
const session = require('express-session');
const flash = require("connect-flash");
require("dotenv").config();


const db = require('./config/mongoose-connection');
const { execPath } = require('process');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.EXPRESS_SESSION_SECRET,
}));

app.use(flash());

// app.use(express.static(path.join(__dirname,"public")));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/",index);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


// app.get('/',(req,res)=>{
//     res.render('createproducts');
// })

app.listen(3000);