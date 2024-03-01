const express = require("express")
const authRouter = express.Router()
const authController = require("../../controller/authController")
const User = require("../../models/userModel")



authRouter.get("/",(req,res)=>{
    res.send("auth")
})

authRouter.post("/signUp",authController.createUser)
authRouter.post("/loginUser",authController.loginUser)






module.exports = authRouter