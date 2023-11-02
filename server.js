const express=require('express')
const app=express();
var mysql = require('mysql');
require('dotenv').config();
const productRouter=require('./router/product')
const authRouter=require('./router/authenticate')
const reviewRouter=require('./router/review')

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_KEY,
    database:process.env.DATABASE_NAME
  });

con.connect(function(err) {
    if (err) throw err;
        console.log("Database Connected!");
});

// creating tables for user
// const createTable=()=>{
//     const query="CREATE TABLE USER (USERNAME VARCHAR(255) PRIMARY KEY,EMAIL VARCHAR(255),PASSWORD VARCHAR(255),FIRSTNAME VARCHAR(255),LASTNAME VARCHAR(255),UNIQUE(EMAIL))";
//     con.query(query,(err,result)=>{
//         if(err) throw err;
//         console.log("Table Created");
//     })};
// above code snipped was only supposed to be used once to create a table.

app.get('/',(req,res)=>{
    res.render('pages/index')
})

app.post('/initialize',(req,res)=>{

})

// route to add a new review to a product
app.use('/product/review',(req,res,next)=>{req.db=con;next()},reviewRouter)
app.use('/product',(req,res,next)=>{req.db=con;next()},productRouter)
app.use('/auth',(req,res,next)=>{req.db=con;next()},authRouter)

app.listen(3000,()=>{
    console.log("Server is listening at 3000")
})

