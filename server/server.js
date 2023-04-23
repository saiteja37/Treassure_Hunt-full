const cors=require("cors")
const express=require("express")
const mongoose=require("mongoose")
const app=express();
const alert=require("alert")
const jwt=require("jsonwebtoken")
const middelware=require("./middleware")
app.use(express.json());
app.use(cors());
app.listen("2000",(req,res)=>{
    console.log("ok")
})
app.get("/",(req,res)=>{
    res.send("hello world")
})
mongoose.connect("mongodb://localhost:27017/Treassure_Hunt",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected")
}).catch((err) => console.log("not connceted"))
const schema=mongoose.Schema({
    "name":String,
    "email":String,
    "pass":String
})
const Customer=mongoose.model("customer",schema);
const schem=mongoose.Schema({
    "count":String,
    "person":String
})
const Score=mongoose.model("score",schem);
app.post("/creg",async(req,res)=>{
    const {name,email,pass}=req.body;
    const use=new Customer({
        name,email,pass
    })
    let exist=await Customer.findOne({email:email});
    if(exist){
        alert("user exist")
    }
    else{
       await  use.save();
        alert("user registered")
    }
})
app.post("/clogin",async(req,res)=>{
    const {email,pass}=req.body;
    let exist=await Customer.findOne({email:email});
    if(exist){
        if(exist.pass===pass){
            alert("logged in successfully")
            let payload={
                user:{
                    id:exist.id
                }
            }
            jwt.sign(payload,'jwtsecret',{expiresIn:3600000},
            (err,token)=>{
                if(!err){
                    return res.json(token)
                }
            }) 
        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user not exist")
    }
})

app.get("/profile",middelware,async(req,res)=>{
    let exist=await Customer.findById(req.user.id)
    return res.json(exist)
})
app.post("/score",async(req,res)=>{
    const {count,person}=req.body;
    const use=new Score({
        count,person
    })
    await use.save();
    res.send("hi")
})
app.get("/rank",async(req,res)=>{
    let exist=await Score.find()
    var byDate = exist.slice(0);
    byDate.sort(function(a,b) {
    return a.count - b.count;
   });
    return res.json(byDate);
})