const db = require("../util/db")

// async / await
const getAll = async (req,res) => {
    try{
        const role = await db.query("SELECT * FROM role")
        const count = await db.query("SELECT COUNT(Id) AS TotalRecord FROM role")
        res.json({
            "total" : count,
            "role": role
        })
    }catch(error){

    }
    // db.query("SELECT * FROM category",(error,rows)=>{
    //     db.query("SELECT * FROM category",(error1,row1)=>{
    //         res.json({
    //             listaa:rows,
    //             list1aaaaaa:row1
    //         })
    //     })
    // })
    
}
// Name
// Code
// Status
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
        // res.sendStatus(401)  // Unauthorized
        // res.sendStatus(200); // equivalent to res.status(200).send('OK')
        // res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
        // res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
        // res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
        // //If an unsupported status code is specified, the HTTP status is still set to statusCode and the string version of the code is sent as the response body.
        res.sendStatus(500)
    }
}

const creates = async (req,res) => {
    try{
        const {
            data // array object
        } = req.body;
        // way 1
        // for(var i = 0 ; i < data.length; i++){
        //     const sql = "INSERT INTO role (Name,Code,Status) VALUES (?,?,?) ";
        //     const param = [data[i].Name,data[i].Code,data[i].Status];
        //     var result = await db.query(sql,param)
        // }

        // way 2
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