let express=require('express')
const authRouter=express()
const {initializeDB}=require('../database');

// signin
authRouter.post('/login',(req,res)=>{
    var data=req.body;
    var con=req.db ;
    const query="SELECT * FROM USER WHERE USERNAME=? AND PASSWORD=?";
    con.query(query,[data.username,data.password],(err,result)=>{
        if(err){
            console.log(err);
            res.send(err.sqlMessage);
        }else{
            if(result.length===1){
                res.send("Login Successful");
            }else{
                console.log("failed")
                res.send("Login Failed");
            }
        }
    })
})

// signup
authRouter.post('/signup',(req,res)=>{
    var data=req.body;
    var con=req.db ;
    const query="INSERT INTO USER (USERNAME,EMAIL,PASSWORD,FIRSTNAME,LASTNAME) VALUES (?,?,?,?,?)";
    con.query(query, [data.username, data.email, data.password, data.fname, data.lname],(err,result)=>{
        if(err){
            res.send(err.sqlMessage);
        }else{
            res.send("SignUp Successful")
        }
    })
})

authRouter.post('/logout',(req,res)=>{
    res.redirect('/login')
})

authRouter.post('/initialize',async(req,res)=>{
    try {
        const result=await initializeDB(req.db);
        console.log(`Result is ${result}`)
    } catch (error) {
        console.log(`Error is ${error}`);
    }
})

// I don't know how should I even maintain a session you know.
// or do I even maintain a session. I mean I have to create some kind of

module.exports=authRouter