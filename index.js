const express=require("express");

const Employee=require("./EmployeeRouter");
require('./dbconfig');

let app=express();

app.use(express.json());
app.use('/Employee',Employee);

app.listen(5000,()=>{
    console.log("Port Listen At 5000");
})