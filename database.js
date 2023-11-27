const {userData,productData,reviewData}=require('./dataarray')

const getAllUsers=(db)=>{
    const query="SELECT * FROM USER";
    return new Promise((resolve,reject)=>{
        db.query(query,(err,result)=>{
            if(err){
                reject(err.sqlMessage)
            }else{
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}

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

const getMostExpensiveItemsInCategory=(db,category)=>{
    const query="SELECT * FROM PRODUCT WHERE CATEGORY LIKE ? AND PRICE = ( SELECT MAX(PRICE) FROM PRODUCT WHERE CATEGORY LIKE ?);"
    return new Promise((resolve,reject)=>db.query(query,['%'+category+'%','%'+category+'%'],(err,result)=>{
        if(err){reject(err.sqlMessage)}
        else{resolve(JSON.parse(JSON.stringify(result)))};
    }))
}

const getCatXandY=(db,cat1,cat2)=>{
    const query="SELECT USERNAME FROM PRODUCT WHERE DATE IN ( SELECT DATE FROM PRODUCT GROUP BY DATE HAVING COUNT(DISTINCT CATEGORY) >=2) AND (CATEGORY LIKE ? OR CATEGORY LIKE ?) GROUP BY USERNAME,DATE HAVING COUNT(DISTINCT CATEGORY)=2";
    return new Promise((resolve,reject)=>db.query(query,['%'+cat1+'%','%'+cat2+'%'],(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase3part3=(db,user)=>{
    const query="SELECT DISTINCT P.PRODUCTID,P.TITLE,P.DESCRIPTION,P.PRICE,MIN(R.REVIEW_TYPE) AS REVIEW_TYPE FROM PRODUCT P JOIN REVIEW R ON P.PRODUCTID = R.PRODUCTID WHERE P.USERNAME = ? AND (R.REVIEW_TYPE = ? OR R.REVIEW_TYPE = ?) GROUP BY P.PRODUCTID, P.TITLE, P.DESCRIPTION, P.PRICE";
    return new Promise((resolve,reject)=>db.query(query,[user,'Excellent','Good'],(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase4part4=(db,date)=>{
    const query="SELECT USERNAME FROM PRODUCT WHERE DATE = ? GROUP BY USERNAME HAVING COUNT(PRODUCTID) = (SELECT COUNT(PRODUCTID) FROM PRODUCT WHERE DATE = ? GROUP BY USERNAME ORDER BY COUNT(PRODUCTID) DESC LIMIT 1);"
    return new Promise((resolve,reject)=>db.query(query,[date,date],(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase5part5=(db,user1,user2)=>{
    const query="SELECT USERNAME,FAVOURITES FROM USER WHERE USERNAME IN (?,?);"
    return new Promise((resolve,reject)=>db.query(query,[user1,user2],(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}
const phase6part6=(db)=>{
    const query="SELECT DISTINCT P.USERNAME FROM PRODUCT P WHERE P.USERNAME NOT IN (SELECT DISTINCT P2.USERNAME FROM PRODUCT P2 JOIN REVIEW R ON P2.PRODUCTID = R.PRODUCTID     WHERE R.REVIEW_TYPE = 'Excellent' GROUP BY P2.USERNAME, P2.PRODUCTID HAVING COUNT(DISTINCT R.REVIEWID) >= 3 );"
    return new Promise((resolve,reject)=>db.query(query,(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase7part7=(db)=>{
    const query="SELECT DISTINCT U.USERNAME FROM USER U WHERE U.USERNAME NOT IN (SELECT DISTINCT R.USERNAME FROM REVIEW R WHERE R.REVIEW_TYPE = 'Poor');"
    return new Promise((resolve,reject)=>db.query(query,(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase8part8=(db)=>{
    const query="SELECT DISTINCT U.USERNAME FROM USER U WHERE U.USERNAME NOT IN (SELECT DISTINCT R1.USERNAME FROM REVIEW R1 WHERE R1.REVIEW_TYPE <> 'Poor' AND R1.USERNAME IS NOT NULL)AND U.USERNAME IN (SELECT DISTINCT R2.USERNAME FROM REVIEW R2 WHERE R2.REVIEW_TYPE = 'Poor' AND R2.USERNAME IS NOT NULL);"
    return new Promise((resolve,reject)=>db.query(query,(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase9part9=(db)=>{
    const query="SELECT DISTINCT P.USERNAME FROM PRODUCT P LEFT JOIN REVIEW R ON P.PRODUCTID = R.PRODUCTID AND R.REVIEW_TYPE = 'Poor' WHERE R.PRODUCTID IS NULL AND P.USERNAME NOT IN (SELECT DISTINCT P2.USERNAME FROM PRODUCT P2 WHERE P2.PRODUCTID NOT IN (SELECT DISTINCT R2.PRODUCTID FROM REVIEW R2));"
    return new Promise((resolve,reject)=>db.query(query,(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
    }))
}

const phase10part10=(db)=>{
    const query=`SELECT U1.USERNAME AS USER_A, U2.USERNAME AS USER_B
    FROM USER U1, USER U2
    WHERE U1.USERNAME < U2.USERNAME
    AND NOT EXISTS (
        SELECT 1
        FROM PRODUCT P1
        LEFT JOIN REVIEW R1 ON P1.PRODUCTID = R1.PRODUCTID AND R1.USERNAME = U2.USERNAME
        WHERE P1.USERNAME = U1.USERNAME AND (R1.REVIEW_TYPE IS NULL OR R1.REVIEW_TYPE <> 'Excellent')
    )
    AND NOT EXISTS (
        SELECT 1
        FROM PRODUCT P2
        LEFT JOIN REVIEW R2 ON P2.PRODUCTID = R2.PRODUCTID AND R2.USERNAME = U1.USERNAME
        WHERE P2.USERNAME = U2.USERNAME AND (R2.REVIEW_TYPE IS NULL OR R2.REVIEW_TYPE <> 'Excellent'));`
    return new Promise((resolve,reject)=>db.query(query,(err,result)=>{
        if(err){
            reject(err.sqlMessage)
        }
        else{
            resolve(JSON.parse(JSON.stringify(result)))
        }
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

const getFavourites=(db,username)=>{
    const query="SELECT FAVOURITES FROM USER WHERE USERNAME = ?"
    return new Promise((resolve,reject)=>{
        db.query(query,[username],(err,result)=>{
            result=JSON.parse(JSON.stringify(result))
            if(err){
                reject(err.sqlMessage)
            }else{
                resolve(result)
            }
        })
    })
}

const updateFavourites=(db,username,fav)=>{
    const query="UPDATE USER SET FAVOURITES= ? WHERE USERNAME= ?"
    return new Promise((resolve,reject)=>{
        db.query(query,[fav.toString(),username.toString()],(err,result)=>{
            // result=JSON.parse(JSON.stringify(result))
            if(err){
                console.log(err.sqlMessage)
                reject(err.sqlMessage)
            }else{
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
        const q0="DROP TABLES USER, PRODUCT,REVIEW;"
        await db.query(q0,(err,result)=>{
            if(err){console.log(err)}
            else{console.log("ALL TABLES DROPPED.")}
        })
    }
    
    // create user table
    const q1="CREATE TABLE USER (USERNAME VARCHAR(255),EMAIL VARCHAR(255) UNIQUE NOT NULL,PASSWORD VARCHAR(255) NOT NULL,FIRSTNAME VARCHAR(255) NOT NULL,LASTNAME VARCHAR(255) NOT NULL,FAVOURITES VARCHAR(255) NOT NULL,PRIMARY KEY(USERNAME))";
    // create product table
    const q2="CREATE TABLE PRODUCT (PRODUCTID INT AUTO_INCREMENT, TITLE VARCHAR(255) NOT NULL,DESCRIPTION VARCHAR(255) NOT NULL,CATEGORY VARCHAR(255) NOT NULL,PRICE DECIMAL(7,2) NOT NULL,USERNAME VARCHAR(255),DATE DATE NOT NULL,FOREIGN KEY(USERNAME) REFERENCES USER(USERNAME), PRIMARY KEY(PRODUCTID))";
    // create review table
    const q3="CREATE TABLE REVIEW (REVIEWID INT AUTO_INCREMENT,PRODUCTID INT, USERNAME VARCHAR(255), REVIEW_DATE DATE NOT NULL, REVIEW_TYPE VARCHAR(255) NOT NULL, REVIEW_DESC VARCHAR(255) NOT NULL,FOREIGN KEY(PRODUCTID) REFERENCES PRODUCT(PRODUCTID),FOREIGN KEY(USERNAME) REFERENCES USER(USERNAME),PRIMARY KEY(REVIEWID))"
    //insertion of records
    var i1="INSERT INTO USER (USERNAME, EMAIL, PASSWORD, FIRSTNAME, LASTNAME,FAVOURITES) VALUES ?";
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
            if(err){
                console.log(err)}
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

module.exports={getFavourites,updateFavourites,getAllUsers,phase7part7,phase8part8,phase9part9,phase10part10,phase6part6,phase5part5,phase4part4,phase3part3,getCatXandY,getMostExpensiveItemsInCategory,CreateProduct,addReview,getAllProducts,getAllReviews,getProductForCategory,getAllReviews,initializeDB,checkforDB}

