let express=require('express')
let reviewRouter=express()

// functions getallreview, addnewreview, 
reviewRouter.post('/add',(req,res)=>{
    let data=req.body;
    const query2="INSERT INTO REVIEW (PRODUCTID, USERNAME, REVIEWDATE,REVIEW_TYPE,REVIEW_DESC) VALUES (?,?,?,?,?)"
    con.query(query2,[data.productid,data.username, data.date,data.type,data.description],(err,result)=>{
        if(err) res.send(err.sqlMessage)
        else res.send({response:"Review Added"})
    })
})

module.exports=reviewRouter;