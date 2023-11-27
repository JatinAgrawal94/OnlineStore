let express=require('express')
const authRouter=express()
const {initializeDB, getFavourites, updateFavourites, getAllUsers}=require('../database');

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
        res.send("Success")
    } catch (error) {
        console.log(`Error is ${error}`);
        res.send("Error")
    }
})

authRouter.post('/favourites/update',async(req,res)=>{
    try {
        let body=req.body;
        let username=req.query.username
        let fav=body['fav']
        // console.log(username)
        // console.log(body);
        let result=await updateFavourites(req.db,username,fav)
        res.send("Success")
    } catch (error) {
        console.log(error);
        res.send("404");
    }
})

authRouter.get('/favourites',async(req,res)=>{
    try {
        let user=req.query.username
        let results=await getFavourites(req.db,user)
        let userslist=await getAllUsers(req.db)
        results=results[0].FAVOURITES.split(',')
        userslist=userslist.filter((f)=>{
            return f.USERNAME!==user.toUpperCase();
        })
        res.render('pages/favourites',{user:user.toUpperCase(),fav:results,users:userslist})
    } catch (error) {
        res.render('pages/404')
    }
})




// I don't know how should I even maintain a session you know.
// or do I even maintain a session. I mean I have to create some kind of

module.exports=authRouter