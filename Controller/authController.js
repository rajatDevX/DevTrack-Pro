const User=require("../models/User");
const bcrypt=require("bcrypt");
exports.getRegister=(req,res)=>{
    res.render("register");

}

exports.postRegister=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.send("user already exists");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            name,email,password:hashedPassword
        });
        res.redirect("/login");
    }
    catch(error){
        res.send(error.message);
    }
}
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.send("invalid email");
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.send("invalid password");
        }
        req.session.user=user;
        res.redirect("/dashboard");

    }
    catch(error){
        res.send(error.message);

    }
}

exports.logout=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    });
};