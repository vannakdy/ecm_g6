
const controller = require("../controller/order.controller")
const order = (app) => {
    app.get("/api/order",controller.getAll);
    app.post("/api/order",controller.create);
    app.post("/api/orders",controller.creates);
    app.put("/api/order",controller.update);
    app.delete("/api/order",controller.remove);
}
module.exports = order;