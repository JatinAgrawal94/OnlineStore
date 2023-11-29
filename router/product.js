let express=require('express');
const { getAllProducts, CreateProduct,getProductForCategory, checkforDB, getMostExpensiveItemsInCategory, getCatXandY, getAllUsers, phase3part3, phase4part4, phase5part5, phase6part6, phase7part7, phase8part8, phase9part9, phase10part10 } = require('../database');
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
        console.log(result);
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

productRouter.get('/category/p4t4',async(req,res)=>{
    try {
        let query=req.query
        var result=await phase4part4(req.db,query.date);
        res.render('pages/p4t4',{users:result,date:query.date})
    } catch (error) {
        console.log(error)
        res.render('pages/404')
    }
})

productRouter.get('/category/p5t5',async(req,res)=>{
    try {
        let query=req.query
        var result=await phase5part5(req.db,query.user1,query.user2);
        let user1=result[0].FAVOURITES.split(',')
        let user2=result[1].FAVOURITES.split(',')
        var final=[]
        if(user1.length>=user2.length){
            for(let i=0;i<user1.length;i++){
                for(let j=0;j<user2.length;j++){
                    if(user1[i]===user2[j]){
                        final.push(user2[i])
                    }
                }
            }
        }else if(user1.length<user2.length){
            for(let i=0;i<user2.length;i++){
                for(let j=0;j<user1.length;j++){
                    if(user1[i]===user2[j]){
                        final.push(user1[i])
                    }
                }
            }
        }
        res.render('pages/p5t5',{users:final,inputuser:query})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p6t6',async(req,res)=>{
    try {
        var result=await phase6part6(req.db);
        res.render('pages/p6t6',{users:result})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p7t7',async(req,res)=>{
    try {
        var result=await phase7part7(req.db);
        res.render('pages/p7t7',{users:result})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p8t8',async(req,res)=>{
    try {
        var result=await phase8part8(req.db);
        res.render('pages/p8t8',{users:result})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p9t9',async(req,res)=>{
    try {
        var result=await phase9part9(req.db);
        res.render('pages/p9t9',{users:result})
    } catch (error) {
        res.render('pages/404')
    }
})

productRouter.get('/category/p10t10',async(req,res)=>{
    try {
        var result=await phase10part10(req.db);
        res.render('pages/p10t10',{users:result})
    } catch (error) {
        console.log(error)
        res.render('pages/404')
    }
})

module.exports=productRouter