const multer = require("multer")
const fs = require("fs")
// import * as fs from 'node:fs';

const Config = {
    image_path : "C:/xampp/htdocs/project/image_6/"
}

// create function remove file in Node.js
const removeFile = async (fileName) => {
    var filePath = Config.image_path+fileName
    // const isExist = await fs.existsSync()
    // if(isExist){
    //     await fs.readFileSync(filePath)
    //     return true
    // }else{
    //     return false
    // }

    // fs.exists(filePath, function(exists) {
    //     if(exists) {
    //         console.log('File exists. Deleting now ...');
    //         fs.unlinkSync(filePath);
    //         return true
    //     } else {
    //         console.log('File not found, so not deleting.');
    //         return false
    //     }
    // });

    try {
        return fs.unlinkSync(filePath);
    } catch (err) {
    return false
    // res.status(500).send({
    //   message: "Could not delete the file. " + err,
    // });
    }
}

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,Config.image_path)
        },
        filename : function(req,file,callback){
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            callback(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    limits:{
        fileSize : (1024*1024) * 3
    },
    fileFilter: function(req,file,callback){
        if(file.mimetype != "image/png" && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
            // not allow 
            callback(null,false)
        }else{
            callback(null,true)
        }
    }
})

module.exports = {
    Config,
    upload,
    removeFile
}