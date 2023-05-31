const mysql=require("mysql");
const con=mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});



exports.view=(req,res)=>{
    con.getConnection((err,connection)=>
{
    if(err) throw err
    connection.query("select * from users",(err,rows)=>{
        connection.release();
        if(!err){
            
            res.render("home",{rows});

        }else{
            console.log("error is listing data"+err);

        }
    });

});
    
};

exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    con.getConnection((err,connection)=>
    {
        if(err) throw err.code
        
        const{name,age,city}=req.body;

        connection.query("insert into users(NAME,AGE,CITY )values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("adduser",{msg:"User Detail Added Success"});
    
            }else{
                console.log("error is listing data"+err);
    
            }
        });
    
    });
}

  
   exports.edituser=(req,res)=>{

    con.getConnection((err,connection)=>
{
    if(err) throw err
    let id=req.params.id;

    connection.query("select * from users where id=?",[id],(err,rows)=>{
        connection.release();
        if(!err){
            
            res.render("edituser",{rows});

        }else{
            console.log("error is listing data"+err);

        }
    });

});

   }



   exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>
    {
        if(err) throw err
       
        
        const{name,age,city}=req.body;
        let id=req.params.id;

        connection.query("update users set Name=?,Age=?,city=? where Id=?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.render("adduser",{msg:"User Detail updated success"});
    
            }else{
                console.log("error is listing data"+err);
    
            }
        });
    
    });
}


exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id;
        connection.query("delete from users where Id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/")

            }else{
                console.log(err);
            }

        });
    });
   };
