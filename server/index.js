const express = require("express");
const app = express();
const morgan = require("morgan")
require("dotenv").config();
const cors = require("cors")
const colors = require("colors");
const connectDB = require("./config/db.js")
const category = require("./routes/category.js")

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//Connection to Databse
connectDB();

//Port Configuration
const port = process.env.PORT || 5000

app.use("/user",require("./routes/user.js"))
app.use("/category",category);
app.use("/product",require("./routes/product.js"))

app.listen(port,()=>{
    console.log(`Server is Lisiting on port ${port}`);
})
