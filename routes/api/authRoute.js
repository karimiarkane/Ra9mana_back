const express = require("express")
const authRouter = express.Router()
const authController = require("../../controller/authController")
const User = require("../../models/userModel")





authRouter.post("/signUp",authController.createUser)
authRouter.post("/loginUser",authController.loginUser)






module.exports = authRouter