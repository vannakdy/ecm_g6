
const db = require("../util/db");
const getAll = (req,res) =>{
    // db.query("sql statement","handler")
    var sql = "SELECT * FROM category"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                message:error,
                error :true
            })
        }else{
            res.json({
                list: rows
            })
        }
    })
   
}

const create = (req,res) =>{
    // req.query / req.body / req.params
    const {Name,Description,Satus} = req.body // get param json from client 
    // if(Name == null || Name == ""){
    //     res.json({
    //         error:true,
    //         message:"Category name required!"
    //     })
    //     return 
    // }else if(Description == null || Description == ""){
    //     res.json({
    //         error:true,
    //         message:"Category Description required!"
    //     })
    //     return 
    // }

    var message = {}; // emplye object
    if(Name == null || Name == ""){
        message.Name = "Category Name required!"
    }
    if(Description == null || Description == ""){
        message.Description = "Category Description required!"
    }

    if(Object.keys(message).length > 0){
        res.json({
            "error":true,
            "message":message
        })
        return false
    }
    var sqlInsert = "INSERT INTO category (Name,Description,Status) VALUES (?,?,?)";
    db.query(sqlInsert,[Name,Description, Satus],(error,rows)=>{
        if(error){
            res.json({
                message:error,
                error :true
            })
        }else{
            // select * from category where Id =  rows.insetId
            // db.query
            res.json({
                data: rows,
                message:"Insert success!"
            })
        }
    })
}

const update = (req,res) =>{
    const {Id,Name,Description,Status} = req.body
    var sql = "UPDATE category SET Name=? , Description=?, Status=?  WHERE Id = ?"
    db.query(sql,[Name,Description,Status,Id],(error,rows)=>{
        if(error){
            res.json({
                message:error,
                error :true
            })
        }else{
            res.json({
                data: rows,
                message:"Update success!"
            })
        }
    })
}

const remove = (req,res) =>{
    const {id} = req.params
    var sql = "DELETE FROM category WHERE Id = ?"
    db.query(sql,[id],(error,rows)=>{
        if(error){
            res.json({
                message:error,
                error :true
            })
        }else{
            res.json({
                data: rows,
                message:"Remove success!"
            })
        }
    })
}

module.exports = {
    getAll,create,update,remove
}