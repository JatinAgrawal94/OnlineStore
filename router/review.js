let express=require('express');
const { addReview, getAllReviews } = require('../database');
let reviewRouter=express()

// functions getallreview, addnewreview, 
reviewRouter.post('/add',async(req,res)=>{
    try {
        let data=req.body;
        var result=await addReview(req.db,data)
        res.send(result);
    } catch (error) {
        res.status(400).json({"response":error})
    }
})


reviewRouter.get('/all/:id',async(req,res)=>{
    try {    
        let param=req.params.id;
        let result=await getAllReviews(req.db,param)
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})


module.exports=reviewRouter;