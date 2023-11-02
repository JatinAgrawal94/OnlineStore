const getProductForCategory=(db,category)=>{
    const query="SELECT * FROM PRODUCT WHERE CATEGORY LIKE ?";
    return new Promise((resolve,reject)=>{
        db.query(query,[`%${category}%`],(err,result)=>{
            if(err){
                reject(err.sqlMessage)
            }else{
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}

const CreateProduct=(con,data)=>{
    let date=new Date();
    date=`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    
    // before adding check if avlues are not more than 3
    const query1="Select COUNT(PRODUCTID) from PRODUCT WHERE USERNAME=? AND DATE=?"
    const query2="INSERT INTO PRODUCT (TITLE,DESCRIPTION,CATEGORY,PRICE,USERNAME,DATE) VALUES (?,?,?,?,?,?)";
    return new Promise((resolve,reject)=>con.query(query1,[data.USERNAME,date],(err,result)=>{
        result=(JSON.parse(JSON.stringify(result))[0])['COUNT(PRODUCTID)']
        if(err){reject("0")}
        else if(result<3){
            let cat=data.CATEGORY
            cat=cat.split(',')
            for(let i=0;i<cat.length;i++){
                cat[i]=cat[i].trim()
            }
            data.CATEGORY=cat.join(',')
            con.query(query2,[data.TITLE,data.DESCRIPTION,data.CATEGORY,data.PRICE,data.USERNAME,date],(err,result)=>{
                if(err){reject("0")}
                else{resolve("1")}
            });
            reject("0")
        }else if(result>=3){
            resolve("3")    
        }
    }))
    
}

const getAllProducts =(db)=>{
    const query="SELECT * FROM PRODUCT";
    return new Promise((resolve,reject)=> db.query(query
        ,(err,result)=>{
        if(err) {reject( err.sqlMessage)}
        else { resolve (JSON.parse(JSON.stringify(result)))};
    }))
}

const addReview=(db,productid, username)=>{
    const query1="Select Count(REVIEWID) FROM REVIEW WHERE USERNAME="
    const query2="INSERT INTO REVIEW (PRODUCTID, USERNAME, REVIEWDATE,REVIEW_TYPE,REVIEW_DESC) VALUES (?,?,?,?,?)"
    con.query(query2,[data.productid,data.username, data.date,data.type,data.description],(err,result)=>{
        if(err) return (err.sqlMessage)
        else return"Review Added"
    })
}



const getAllReviews=(db,productid)=>{}



module.exports={CreateProduct,addReview,getAllProducts,getAllReviews,getProductForCategory}

