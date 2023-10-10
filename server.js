const express=require('express')
const app=express();
var mysql = require('mysql');
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

var con = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_KEY,
    database:process.env.DATABASE_NAME
  });

// Database was created manually using terminal

con.connect(function(err) {
    if (err) throw err;
        console.log("Database Connected!");
});


// creating tables for user
const createTable=()=>{
    const query="CREATE TABLE USER (USERNAME VARCHAR(255) PRIMARY KEY,EMAIL VARCHAR(255),PASSWORD VARCHAR(255),FIRSTNAME VARCHAR(255),LASTNAME VARCHAR(255),UNIQUE(EMAIL))";
    con.query(query,(err,result)=>{
        if(err) throw err;
        console.log("Table Created");
    })};
// above code snipped was only supposed to be used once to create a table.

app.get('/',(req,res)=>{
    res.render('pages/index')
})


app.post('/loginuser',(req,res)=>{
    /// here we have to check whether an email of password combinations exist or not.
    var data=req.body;
    const query="SELECT * FROM USER WHERE USERNAME=? AND PASSWORD=?";
    con.query(query,[data.username,data.password],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err.sqlMessage);
        }else{
            if(result.length===1){
                res.send('Login Successfull');
            }else{
                res.send("Login Failed");
            }
        }
    })
})

// placeholders are being used in the code for sql injection attacks
app.post("/signupuser",(req,res)=>{
    var data=req.body;
    const query="INSERT INTO USER (USERNAME,EMAIL,PASSWORD,FIRSTNAME,LASTNAME) VALUES (?,?,?,?,?)";
    con.query(query, [data.username, data.email, data.password, data.fname, data.lname],(err,result)=>{
        if(err){
            // console.log(err.sqlMessage)
            res.send(err.sqlMessage);
        }else{
            res.send("SignUp Successful")
        }
    })
})

app.listen(3000,()=>{
    console.log("Server is listening at 3000")
})
