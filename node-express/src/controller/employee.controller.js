
const db = require("../util/db");
const { removeFile, Config } = require("../util/helper");

const getAll = async (req,res) => {
   try{
        var sql = "SELECT * FROM employee"
        const list = await db.query(sql);
        res.json({
            list: list
        })
   }catch(error){
        res.sendStatus(500)
   }
}

//Id Firstname, Lastname, Gender, Dob, Image, Tel, Email, Address, Salary, Role

const create = async (req,res) => {
    try{
        const {
            Firstname, Lastname, Gender, Dob, Tel, Email, Address, Salary, Role
        } = req.body
        var filename = null
        if(req.file){
            filename = req.file.filename
        }
        var sql = "INSERT INTO employee (Firstname, Lastname, Gender, Dob, Image, Tel, Email, Address, Salary, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        var param = [Firstname, Lastname, Gender, Dob, filename, Tel, Email, Address, Salary, Role]
        const data = await db.query(sql,param);
        res.json({
            message : data.affectedRows ? "Insert success!" : "Somthing wrong!",
            data : data
        })
    }catch(error){
        res.sendStatus(500)
    }
    
}

const update = async(req,res) => {
    try{
        const {
            Id, Firstname, Lastname, Gender, Dob, Tel, Email, Address, Salary, Role
        } = req.body
        var filename = null
        if(req.file){
            filename = req.file.filename
        }
        var sql = "UPDATE employee SET Firstname=?, Lastname=?, Gender=?, Dob=?, Image=?, Tel=?, Email=?, Address=?, Salary=?, Role=? WHERE Id = ?"
        var param = [Firstname, Lastname, Gender, Dob, filename, Tel, Email, Address, Salary, Role, Id]
        const data = await db.query(sql,param);
        res.json({
            message : data.affectedRows ? "Update success!" : "Somthing wrong!",
            data : data
        })
    }catch(error){
        res.status(500).send({
            message: error,
        });
    }
}

const remove = async (req,res) => {
    const {Id} = req.body
    try{
        const employee = await db.query("SELECT * FROM employee WHERE Id = ?",[Id]);
        if(employee){
            var sql = "DELETE FROM employee WHERE Id = ?"
            const data = await db.query(sql,[Id]);
            if(data.affectedRows){
                // - filename from db to remove in path server
                if(employee[0].Image){
                    removeFile(employee[0].Image)
                }
            }
            res.json({
                message:data.affectedRows ? "Remove success!" : "Somthing wrong!",
                data: data
            })
        }else{
            res.json({
                message:"Somthing wrong!"
            })
        }
        
   }catch(error){
        res.status(500).send({
            message: error,
        });
   }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}




