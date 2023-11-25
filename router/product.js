let express=require('express');
const { getAllProducts, CreateProduct,getProductForCategory, checkforDB, getMostExpensiveItemsInCategory, getCatXandY, getAllUsers, phase3part3 } = require('../database');
const productRouter=express();

//  insert product, send all product, add review to product
function removeDuplicates(arr){
    return [...new Set(arr)];
}

// insert product
productRouter.get('/',async(req,res)=>{
    let result=await checkforDB(req.db)
    if(result==false){
        res.render('pages/resource')
    }
    else{
        var products=await getAllProducts(req.db);
        var users=await getAllUsers(req.db);
        var categories=[]
        if(products.length!==0){
            for(let i=0;i<products.length;i++){
                categories=categories.concat(products[i].CATEGORY.replace(/\s/g, "").split(','))
            }
        }   
        categories=removeDuplicates(categories)
        res.render('pages/landing',{categories:categories,user:users})
    }
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

// products relating to a specific category
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


// most expensive products in all categories
productRouter.get('/category/expensive',async(req,res)=>{
    try {
        var products=await getAllProducts(req.db);
        var categories=[]
        if(products.length!==0){
            //  get all categories
            for(let i=0;i<products.length;i++){
                categories=categories.concat(products[i].CATEGORY.replace(/\s/g, "").split(','))
            }
            console.log(categories)
            categories=removeDuplicates(categories)
            // get most expensive items in all categories.
            var results=[]
            for(let i=0;i<categories.length;i++){
                results.push(await getMostExpensiveItemsInCategory(req.db,categories[i]))            
            }
            res.render('pages/exp',{data:results,category:categories})
        }else{
            res.status(404);
        } 
    } catch (error) {
        
    }
})

productRouter.get('/category/catxandy',async(req,res)=>{
    try {
        const query=req.query
        let cat1=query.cat1
        let cat2=query.cat2
        var result=await getCatXandY(req.db,cat1,cat2)
        console.log(result);
        res.render('pages/catxandy',{users:result})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p3t3',async(req,res)=>{
    try {
        let query=req.query
        var result=await phase3part3(req.db,query.user);
        res.render('pages/p3t3',{product:result})
    } catch (error) {
        res.render('pages/404')
    }
})

module.exports=productRouter