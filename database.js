const {userData,productData,reviewData}=require('./dataarray')

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

const addReview=(db,data)=>{
    const query="SELECT * FROM PRODUCT WHERE PRODUCTID=? AND USERNAME=?"
    let date=new Date();
    date=`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
    const query1="Select Count(REVIEWID) FROM REVIEW WHERE USERNAME=? AND REVIEW_DATE=?"
    const query2="INSERT INTO REVIEW (PRODUCTID, USERNAME, REVIEW_DATE,REVIEW_TYPE,REVIEW_DESC) VALUES (?,?,?,?,?)"

    return new Promise((resolve,reject)=>{
        db.query(query,[data.productid,data.username],(err,result)=>{
            result=JSON.parse(JSON.stringify(result))
            if(err) {reject({response:err.sqlMessage})}
            else if(result.length!==0){
                reject("101")
            }else{
                db.query(query1,[data.username,date],(err,result)=>{
                    result=JSON.parse(JSON.stringify(result))
                    result=result[0]['Count(REVIEWID)']
                    if(err) reject({response:err.sqlMessage})
                    else if(result<3){
                        db.query(query2,[data.productid,data.username,date,data.type,data.description],(err,result)=>{
                            resolve({resposne:"100"})
                        })
                    }else if(result>=3){
                        reject({response:"102"})
                    }   
                })
            }
        })
    }).catch((err)=>{
    })
}

// insert into review where username="" and 

const getAllReviews=(db,productid)=>{
    const query="SELECT * FROM REVIEW WHERE PRODUCTID=?"
    return new Promise((resolve,reject)=>{
        db.query(query,[productid],(err,result)=>{
            result=JSON.parse(JSON.stringify(result))
            if(err) reject(err.sqlMessage)
            else{
                resolve(result)
            }
        })
    })

}

const checkforDB=async(db)=>{
    // assuming db is created check for tables,
    const q="SHOW TABLES";
    return new Promise((resolve,reject)=>{
        db.query(q,(err,result)=>{
            if(err){reject(err)}
            else{
                result=JSON.parse(JSON.stringify(result))
                var count=0;
                for(let i=0;i<result.length;i++){
                    if(result[i]['Tables_in_ONLINESTORE']==='PRODUCT' || result[i]['Tables_in_ONLINESTORE']==='USER' || result[i]['Tables_in_ONLINESTORE']==='REVIEW'){
                        count=count+1
                    }
                }
                if(count===3){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }
        })
    })
}

const initializeDB=async(db)=>{ 
    // if the tables are there drop them
    const result=await checkforDB(db)
    if(result==true){
        console.log(result)
        const q0="DROP TABLES USER, PRODUCT,REVIEW;"
        await db.query(q0,(err,result)=>{
            if(err){console.log(err)}
            else{console.log("ALL TABLES DROPPED.")}
        })
    }
    
    // create user table
    const q1="CREATE TABLE USER (USERNAME VARCHAR(255),EMAIL VARCHAR(255) UNIQUE NOT NULL,PASSWORD VARCHAR(255) NOT NULL,FIRSTNAME VARCHAR(255) NOT NULL,LASTNAME VARCHAR(255) NOT NULL,PRIMARY KEY(USERNAME))";
    // create product table
    const q2="CREATE TABLE PRODUCT (PRODUCTID INT AUTO_INCREMENT, TITLE VARCHAR(255) NOT NULL,DESCRIPTION VARCHAR(255) NOT NULL,CATEGORY VARCHAR(255) NOT NULL,PRICE DECIMAL(7,2) NOT NULL,USERNAME VARCHAR(255),DATE DATE NOT NULL,FOREIGN KEY(USERNAME) REFERENCES USER(USERNAME), PRIMARY KEY(PRODUCTID))";
    // create review table
    const q3="CREATE TABLE REVIEW (REVIEWID INT AUTO_INCREMENT,PRODUCTID INT, USERNAME VARCHAR(255), REVIEW_DATE DATE NOT NULL, REVIEW_TYPE VARCHAR(255) NOT NULL, REVIEW_DESC VARCHAR(255) NOT NULL,FOREIGN KEY(PRODUCTID) REFERENCES PRODUCT(PRODUCTID),FOREIGN KEY(USERNAME) REFERENCES USER(USERNAME),PRIMARY KEY(REVIEWID))"
    //insertion of records
    var i1="INSERT INTO USER (USERNAME, EMAIL, PASSWORD, FIRSTNAME, LASTNAME) VALUES ?";
    var i2="INSERT INTO PRODUCT (USERNAME,TITLE,DESCRIPTION,CATEGORY,PRICE,DATE) VALUES ?";
    var i3="INSERT INTO REVIEW (USERNAME,PRODUCTID,REVIEW_DATE,REVIEW_TYPE,REVIEW_DESC) VALUES ?";
    try {   
        await db.query(q1,(err,result)=>{
            if(err){console.log(err)}
            else{console.log("USER TABLE CREATED")};
        })
       await  db.query(q2,(err,result)=>{
            if(err){console.log(err)}
            else{console.log("PRODUCT TABLE CREATED")};
        })
        await db.query(q3,(err,result)=>{
            if(err){console.log(err)}
            else{console.log("REVIEW TABLE CREATED")};
        })

        await db.query(i1,[userData],(err,result)=>{
            if(err){console.log(err)}
            else{console.log("USER'S CREATED")};
        })
        await db.query(i2,[productData],(err,result)=>{
            if(err){console.log(err)}
            else{console.log("PRODUCT'S ADDED")};
        })
        await db.query(i3,[reviewData],(err,result)=>{
            if(err){console.log(err)}
            else{console.log("REVIEW'S ADDED")};
        })
        return "success";
    } catch (error) {
        console.log(error);
    }
    
}

module.exports={CreateProduct,addReview,getAllProducts,getAllReviews,getProductForCategory,getAllReviews,initializeDB,checkforDB}

