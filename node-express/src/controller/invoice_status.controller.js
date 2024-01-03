const db = require("../util/db")

const getAll = async (req,res) => {
    try{
        res.json({
            list : await db.query("SELECT * FROM order_status")
        })
    }catch(error){
        res.sendStatus(5000)
    }
}
const create = async (req,res) => {
    try{
        const {
            Name,Code,Status
        } = req.body;
        const sql = "INSERT INTO role (Name,Code,Status) VALUES (?,?,?)";
        const param = [Name,Code,Status];
        const data = await db.query(sql,param);
        res.json({
            message : (data.affectedRows) ? "Insert success!" : "Somthing wrong",
            data : data
        })
    }catch(e){
        res.sendStatus(500)
    }
}

const creates = async (req,res) => {
    try{
        const {
            data 
        } = req.body;
        const sql = "INSERT INTO role (Name,Code,Status) VALUES ? ";
        var param = []
        for(var i = 0 ; i < data.length; i++){
            param.push([data[i].Name,data[i].Code,data[i].Status])
        }
        var result = await db.query(sql,[param])
        res.json({
            message:"Insert success"
        })

    }catch(e){
        res.sendStatus(500)
    }
}

const update = async (req,res) => {
    try{
        const {
            Id, Name ,Code, Status
        } = req.body;
        const sql = "UPDATE role set  Name = ? , Code = ? , Status = ? WHERE Id = ?";
        const param = [Name,Code,Status,Id];
        const data = await db.query(sql,param);
        res.json({
            message : (data.affectedRows) ? "Update success!" : "Somthing wrong",
            data : data 
        })
    }catch(e){
        res.sendStatus(500)
    }
}
const remove = async (req,res) => {
    try{
        const {
            Id
        } = req.body;
        const data = await db.query("DELETE FROM role WHERE Id = ?",[Id]);
        res.json({
            message: (data.affectedRows) ? "Delete success!" : "Somthing wrong",
            data : data
        })
    }catch(e){
        res.sendStatus(500)
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    creates
}