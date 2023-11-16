const express = require("express");
const app = express();
const morgan = require("morgan")
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db.js")


//middleware
app.use(express.json())
app.use(morgan("dev"))

//Connection to Databse
connectDB();

//Port Configuration
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is Lisiting on port ${port}`);
})
