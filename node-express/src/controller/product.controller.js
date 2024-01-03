const db = require("../util/db")

// INSERT INTO `product`
// ( `category_id`, `name`, `description`, `price`, `quantity`, `image`, `is_active`, ) 
// VALUES 
// (1,'Macbook Pro 2022','Macbook Pro 2022',2000,20,'',1),
// (1,'Macbook Pro 2021','Macbook Pro 2021',1900,10,'',1)

const getAll = async (req,res) => {
    try{
        var {
            txt_search,category_id,brand,page
        } = req.param;
        var sqlList = "SELECT "+
        " p.*,"+
        " c.Name as category_name"+
        " FROM product as p"+
        " INNER JOIN category as c on (p.category_id = c.Id) "+
        " ORDER BY id DESC ";
        // var sqlStr = "SELECT p.*, c.Name as category_name FROM product as p INNER JOIN category as c on (p.category_id = c.Id) ORDER BY id DESC"
        var list =  await db.query(sqlList)
        var list_category =  await db.query("SELECT * FROM category")
        var brand = [
            {
                Id : "Apple",
                Name : "Apple"
            },
            {
                Id : "Microsoft",
                Name : "Microsoft"
            },
            {
                Id : "Other",
                Name :"Other"
            }
        ]
        res.json({
           list :list,
           list_category :list_category,
           list_brand: brand
        })
    }catch(error){
        res.sendStatus(500)
    }
}
const create = async (req,res) => {
    try{
        const {
            category_id,name,description,price,quantity,image,is_active
        } = req.body;
        var image_name = image;
        if(req.file){
            image_name = req.file.filename
        }
        const sql = "INSERT INTO product ( category_id,name,description,price,quantity,image,is_active) VALUES (?,?,?,?,?,?,?)";
        const param = [category_id,name,description,price,quantity,image_name,is_active];
        const data = await db.query(sql,param);
        res.json({
            message : (data.affectedRows) ? "Insert success!" : "Somthing wrong",
            data : data
        })
    }catch(e){
        res.sendStatus(500)
    }
}

const update = async (req,res) => {
    try{
        const {
            category_id,name,description,price,quantity,image,is_active,id
        } = req.body;
        var image_name = image;
        if(req.file){
            image_name = req.file.filename
        }
        const sql = "UPDATE product SET category_id=?, name=?, description=?, price=?, quantity=?, image=?, is_active=? WHERE id = ?";
        const param = [category_id,name,description,price,quantity,image_name,is_active,id];
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
           id
        } = req.body;
        const data = await db.query("DELETE FROM product WHERE id = ?",[id]);
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
    remove
}