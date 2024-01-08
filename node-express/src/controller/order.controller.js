const db = require("../util/db")

const getAll = async (req,res) => {
    try{
        const role = await db.query("SELECT * FROM order")
        res.json({
            list: role
        })
    }catch(error){

    }
    
}

// create order
const create = async (req,res) => {
    try{
        db.beginTransaction();
        const {
            customer_id,
            user_id,
            order_status_id,
            payment_method_id,
            total,
            note,
            is_paid,
            array_product,
        } = req.body;
        // array_product = [
        //     {
        //         id : 1,
        //         price : 100,
        //         qty : 1,
        //         discount : 0
        //     },
        //     {
        //         id : 1,
        //         price : 100,
        //         qty : 1,
        //         discount : 0
        //     }
        // ]
        // for table order
        const sqlOrder = "INSERT INTO `order` (customer_id,user_id,order_status_id,payment_method_id,total,note,is_paid) VALUES (?,?,?,?,?,?,?)";
        const paramOrder = [customer_id,user_id,order_status_id,payment_method_id,total,note,is_paid];
        const dataOrder = await db.query(sqlOrder,paramOrder);
        // for table orderdetails
        array_product.map( async (item,index)=>{
            const sqlOrderDetails = "INSERT INTO order_details (order_id,product_id,quantity,price,discount,discount_price,total) VALUES (?,?,?,?,?,?,?)"
            const paramOrderDetails = [dataOrder.insertId, item.id, item.qty, item.price, 0, 0,(item.qty*item.price)]
            const dataOrderDetails = await db.query(sqlOrderDetails,paramOrderDetails);

            // for re stock | update stock in table product
            const sqlResStock = "UPDATE product SET quantity=(quantity-?) WHERE id = ?"
            const paramReStock = [item.qty,item.id];
            const dataUpdateStock = await db.query(sqlResStock,paramReStock);
        })
        db.commit()
        res.json({
            message : (dataOrder.affectedRows) ? "Order success!" : "Somthing wrong",
            data : dataOrder
        })
    }catch(e){
        console.log(e)
        db.rollback();
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