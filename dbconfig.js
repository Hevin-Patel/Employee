let mongoose=require('mongoose');
require('dotenv').config();
let Url=process.env.URL
mongoose.connect(Url)
.then(()=>{
   console.log("Database Connected"); 
})
.catch((err)=>{
    console.log(err);
})