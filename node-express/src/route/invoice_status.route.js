const controller = require("../controller/invoice_status.controller")
const invoice_status = (app) => {
    app.get("/api/invoice_status",controller.getAll);
    app.post("/api/invoice_status",controller.create);
    app.post("/api/invoice_statuss",controller.creates);
    app.put("/api/invoice_status",controller.update);
    app.delete("/api/invoice_status",controller.remove);
}
module.exports = invoice_status;