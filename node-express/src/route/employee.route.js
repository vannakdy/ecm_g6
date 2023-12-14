const ctr_employee = require("../controller/employee.controller")
const {upload} = require("../util/helper")
const employee = (app) => {
    app.get("/api/employee",ctr_employee.getAll);
    app.post("/api/employee",upload.single("upload_emp"),ctr_employee.create);
    app.put("/api/employee",upload.single("upload_emp"),ctr_employee.update);
    app.post("/api/employee/set-password",ctr_employee.setPassword);
    app.post("/api/employee/login",ctr_employee.login);
    app.delete("/api/employee",ctr_employee.remove);
}
module.exports = employee