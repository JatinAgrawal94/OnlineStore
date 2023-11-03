let express=require('express');
const { getAllProducts, CreateProduct,getProductForCategory } = require('../database');
const productRouter=express();

//  insert product, send all product, add review to product

// insert product
productRouter.get('/',async(req,res)=>{
    var products=await getAllProducts(req.db);
    var categories=[]
    if(products.length!==0){
        for(let i=0;i<products.length;i++){
            categories=categories.concat(products[i].CATEGORY.split(','))
        }
    }
    res.render('pages/landing',{categories:categories})
})

productRouter.post('/new',async(req,res)=>{
    try {
        let data=req.body;
        let result=await CreateProduct(req.db,data);
        if(result==3){
            res.send("3")
        }else
        res.send({"response":result})
    } catch (error) {
        res.send({"response":"Failed"})
    }
})

productRouter.get('/category',async(req,res)=>{
    try {
        var param=req.query.category;
        if(param=='all'){
            param=""
        }
        var result=await getProductForCategory(req.db,param)
        res.send({response:result});
    } catch (error) {
        res.send(error)
    }
})

module.exports=productRouter