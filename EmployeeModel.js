let mongoose=require('mongoose');
let joi=require('joi')

let EmployeeSchema=mongoose.Schema({
    Id:Number,
    Name:String,
    Salary:Number,
    Password:String
})

const joischema=joi.object({
    Id:joi.number().required(),
    Name:joi.string().required(),
    Salary:joi.number().required(),
    Password:joi.string().required()
})

let employee=mongoose.model("Employee",EmployeeSchema);

module.exports={employee,joischema}