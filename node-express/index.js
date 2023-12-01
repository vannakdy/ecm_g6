const express = require("express"); // import library express
const app = express();
app.use(express.json()) // allow serer get json from requeset

app.get("/",(req,res)=>{
    // handle requrest from client 
    res.send("Hello Express in nodejs")
})

// const customer = require("./src/route/customer.route"); // import function customer route
//  customer(app); // call function

require("./src/route/customer.route")(app) // short import and call
require("./src/route/employee.route")(app)
require("./src/route/category.route")(app)
require("./src/route/role.route")(app)


// requred
const port = 8081
app.listen(port,()=>{
    console.log("http://localhost:"+port)
})