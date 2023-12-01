
const controller = require("../controller/role.controller")
const role = (app) => {
    app.get("/api/role",controller.getAll);
    app.post("/api/role",controller.create);
    app.post("/api/roles",controller.creates);
    app.put("/api/role",controller.update);
    app.delete("/api/role",controller.remove);
}
module.exports = role;