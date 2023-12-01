
/// will call connect to database
const db = require("../util/db")
const getAll = (req,res) => {
    var sqlSelect = "SELECT * FROM category;"
    db.query(sqlSelect,(error,rows)=>{
        res.json({
            list_category:rows
        })
    })
}


const create = (req,res) => {
    var password = req.body.password
    var username = req.body.username
    res.send("create customer")
}

const update = (req,res) => {
    res.send("update customer call")
}

const remove = (req,res) => {
    res.send("remove customer call")
}

const changeStatus = (req,res) => {
    res.send("chanage status customer call")
}


module.exports = {
    getAll, create, update,remove,changeStatus
}