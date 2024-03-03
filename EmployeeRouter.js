const express=require('express');
let jsonwebtoken=require("jsonwebtoken")
const {Read,Write,Edit,Delete,ReadById,ReadBySalary,SortBySalary,LimitList,GetNameAndSalary,Login}=require('./EmployeeController');
let router=express.Router();

let MW=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token!=null){
        try{
            let correctToken=jsonwebtoken.verify(token,'abc')
            if(correctToken){
                next()
            }
            // else{
            //     res.send({message:"Token Is Not Correct"})
            // }
        }
        catch(err){
            res.send({err:err})
        }
    }
    else{
        res.send({message:"Token Not Available"})
    }
}

router.post("/addList",Write);
router.post("/login",Login);
router.get("/getList",MW,Read);
router.put("/editList",Edit);
router.delete("/deleteList",Delete);
router.get("/getListById",ReadById);
router.get("/getListBySalary",ReadBySalary);
router.get("/sortBySalary",SortBySalary);
router.get("/limitList",LimitList);
router.get("/getNameAndSalary",GetNameAndSalary);
module.exports=router;