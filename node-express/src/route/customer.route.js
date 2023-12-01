const ctr_customer = require("../controller/customer.controller")
const customer = (app) => {
    app.get("/api/customer",ctr_customer.getAll)// use for get data
    app.post("/api/customer",ctr_customer.create)// // use for create data
    app.put("/api/customer",ctr_customer.update) // use for modify data
    app.delete("/api/customer",ctr_customer.remove) // use for remove data
    app.post("/api/customer/chage_status",ctr_customer.changeStatus) // use for remove data
}
module.exports = customer