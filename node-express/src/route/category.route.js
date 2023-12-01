
const controller = require("../controller/category.controller")
const category = (app) => {
    app.get("/api/category",controller.getAll)
    app.post("/api/category",controller.create)
    app.put("/api/category",controller.update)
    app.delete("/api/category/:id",controller.remove)
}

module.exports = category