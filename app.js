const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.send("it works")
})

app.listen(port , ()=>{
    console.log(`the server is running on ${port}`);
})