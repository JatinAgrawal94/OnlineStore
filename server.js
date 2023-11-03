const express=require('express')
const app=express();
var mysql = require('mysql');
require('dotenv').config();
const productRouter=require('./router/product')
const authRouter=require('./router/authenticate')
const reviewRouter=require('./router/review')
const cors=require('cors')

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_KEY,
    database:process.env.DATABASE_NAME,
    multipleStatements:true
  });

con.connect(function(err) {
    if (err) throw err;
        console.log("Database Connected!");
});

app.use(cors())

app.get('/',(req,res)=>{
    res.render('pages/index')
})

// route to add a new review to a product
app.use('/product/review',(req,res,next)=>{req.db=con;next()},reviewRouter)
app.use('/product',(req,res,next)=>{req.db=con;next()},productRouter)
app.use('/auth',(req,res,next)=>{req.db=con;next()},authRouter)

app.listen(3000,()=>{
    console.log("Server is listening at 3000")
})

