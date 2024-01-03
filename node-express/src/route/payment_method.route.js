const controller = require("../controller/payment_method.controller")
const payment_method = (app) => {
    app.get("/api/payment_method",controller.getAll);
    app.post("/api/payment_method",controller.create);
    app.post("/api/payment_methods",controller.creates);
    app.put("/api/payment_method",controller.update);
    app.delete("/api/payment_method",controller.remove);
}
module.exports = payment_method;