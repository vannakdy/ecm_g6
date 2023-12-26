
const db = require("../util/db");
const { removeFile, Config } = require("../util/helper");
const bcrypt = require("bcrypt");
const { getPermissionMenuByRoleCode } = require("./permission.controller");

const getAll = async (req,res) => {
   try{
        var sql = "SELECT "+
                   " e.*,"+
                   " r.Name as RoleName"+
                " FROM employee as e"+
                " LEFT JOIN Role as r ON e.RoleId = r.Id"+
                " ORDER BY Id DESC";    
        var sqlCount = " SELECT COUNT(Id) as totalRecords FROM employee;";
        const list = await db.query(sql);
        const total = await db.query(sqlCount)
        const roleList = await db.query("SELECT * FROM Role")
        res.json({
            list: list,
            totalRecords: total[0].totalRecords,
            roleList : roleList
        })
   }catch(error){
        res.sendStatus(500)
   }
}

const setPassword = async (req,res) => {
    try{
        const {Username,Password,ConfirmPassword } = req.body;
        var message = {};
        // validate field requered
        if(Username == null || Username == ""){
            message.Username = "Please fill in Username!";
        }
        if(Password == null || Password == ""){
            message.Password = "Please fill in Password!";
        }
        if(Password != ConfirmPassword){
            message.Password = "Password and Confirm password not match!";
        }
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false
        }
        // Tel, Password, ConfirmPassword : have
        // bycrypt
        var hashPassword = await bcrypt.hashSync(Password,10) // 123456 => LKJEROIJ@#OJ$O*@)$(*&#@)$(#@)
        var sql =  "UPDATE employee SET Password = ? WHERE Tel = ?";
        const data = await db.query(sql,[hashPassword,Username])
        res.json({
            message: data.affectedRows ? "Password set success" : "Somthing wrong!"
        })
    }catch(err){
        res.status(500).send({
          message: err.message
        });
    }
}

const login = async (req,res)=>{
    try{
        const {
            Username,Password
        } = req.body;
        var message = {};
        if(Username == null || Username == ""){
            message.Username = "Please fill in Username!";
        }
        if(Password == null || Password == ""){
            message.Password = "Please fill in Password!";
        }
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false
        }
        // Check is Existing user? by Username
        const user = await db.query("SELECT * FROM employee WHERE Tel = ? ",[Username]);
        if(user.length == 0){
            res.json({
                error:true,
                message:"Username does't exist!"
            })
        }else{
            // Verify password (Pass_From_Client , Pass_From_Db) | (123456 , ËRERERWRE234234234@#$#$%$#)
            var PasswordFromDB = user[0].Password
            if(PasswordFromDB == null){
                res.json({
                    error:true,
                    message:"Please activate account!"
                })
            }
            const isCorrect = await bcrypt.compareSync(Password,PasswordFromDB);
            delete user[0].Password // Remove properties Password
            delete user[0].Salary // Remove properties Password
            if(isCorrect){
                res.json({
                    message:"Login success",
                    profile : user[0],
                    menu : getPermissionMenuByRoleCode(user[0].Role)
                })
            }else{
                res.json({
                    error:true,
                    message:"Password incorrect!"
                })
            }
        }
    }catch(e){
        res.status(500).send({
            message:e.message
        })
    }
}

//Id Firstname, Lastname, Gender, Dob, Image, Tel, Email, Address, Salary, Role

const create = async (req,res) => {
    try{
        const {
            Firstname, Lastname, Gender, Dob, Tel, Email, Address, Salary, RoleId
        } = req.body
        var filename = null
        if(req.file){
            filename = req.file.filename
        }
        var sql = "INSERT INTO employee (Firstname, Lastname, Gender, Dob, Image, Tel, Email, Address, Salary, RoleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        var param = [Firstname, Lastname, Gender, Dob, filename, Tel, Email, Address, Salary, RoleId]
        const data = await db.query(sql,param);
        res.json({
            message : data.affectedRows ? "Insert success!" : "Somthing wrong!",
            data : data
        })
    }catch(error){
        res.status(500).send({
            message:error.message
        })
    }
    
}

const update = async(req,res) => {
    try{
        const {
            Id, Firstname, Lastname, Gender, Dob, Tel, Email, Address, Salary, RoleId, Image
        } = req.body
        var filename = null
        if(req.file){
            filename = req.file.filename
        }else{
            filename = Image
        }
        var sql = "UPDATE employee SET Firstname=?, Lastname=?, Gender=?, Dob=?, Image=?, Tel=?, Email=?, Address=?, Salary=?, RoleId=? WHERE Id = ?"
        var param = [Firstname, Lastname, Gender, Dob, filename, Tel, Email, Address, Salary, RoleId, Id]
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
    remove,
    setPassword,
    login
}




