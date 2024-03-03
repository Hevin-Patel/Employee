const {employee,joischema}=require('./EmployeeModel.js');
const bcrypt=require('bcrypt')
const jsonwebtoken=require('jsonwebtoken')

const Read=(req,res)=>{
    employee.find()
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const Login=(req,res)=>{
    let Pass=req.body.Password
    employee.findOne({Name:req.body.Name})
    .then((resp)=>{
        let decryptedPassword=bcrypt.compareSync(Pass,resp.Password)
        if(decryptedPassword){
            let token=jsonwebtoken.sign({Name:resp.Name, Password:resp.Password},'abc')
            console.log(resp)
            res.send({message:"Login Successfull",token})
        }
        else{
            res.send({message:"User Not Found..."})
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Login Error..."});
    })
}

const Write=(req,res)=>{
    let Pass=req.body.Password
    let encyptedPassword=bcrypt.hashSync(Pass,10)
    employee.findOne({}).sort({Id:-1})
    .then((resp)=>{
        const {error,value}=joischema.validate({
            Id:resp.Id+1,
            Name:req.body.Name,
            Salary:req.body.Salary,
            Password:encyptedPassword
        })
        if(error){
            console.log(error)
            res.send({message:"Validate Error Occur..."})
        }
        else{
            let Data=new employee(value);
            Data.save()
            .then((resp)=>{
                console.log(token)
                res.send({resp});
            })
            .catch((err)=>{
                console.log(err);
                res.send({message:"An Error Occur..."});
            })
        }    
    })
    .catch((err)=>{
            console.log(err);
            res.send({message:"An ID Error Occur..."});
        });

}

const Edit=(req,res)=>{
    employee.updateOne({Id:req.query.Id},req.body)
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."})
    })
}

const Delete=(req,res)=>{
    employee.deleteOne({Id:req.query.Id})
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const ReadById=(req,res)=>{
    employee.findOne({Id:req.query.Id})
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const ReadBySalary=(req,res)=>{
    employee.find({Salary:{$gt:5000}})
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const SortBySalary=(req,res)=>{
    employee.find({}).sort({Salary:1})
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const LimitList=(req,res)=>{
    employee.find({}).skip(1).limit(3)
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

const GetNameAndSalary=(req,res)=>{
    employee.find({$or:[{Salary:{$gte:5000}},{Name:'Panda'}]}).select('Name Salary')
    .then((resp)=>{
        res.send({resp});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"An Error Occur..."});
    })
}

module.exports={Read,Write,Edit,Delete,ReadById,ReadBySalary,SortBySalary,LimitList,GetNameAndSalary,Login};