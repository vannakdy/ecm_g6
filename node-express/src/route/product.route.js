const controller = require("../controller/product.controller")
const {upload}  = require("../util/helper")
const product = (app) => {
    app.get("/api/product",controller.getAll);
    app.post("/api/product/getone",controller.getOne);
    app.post("/api/product",upload.single("product_image"),controller.create);
    app.put("/api/product",upload.single("product_image"),controller.update);
    app.delete("/api/product",controller.remove);
}
module.exports = product;