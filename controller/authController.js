const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const validator = require("validator");

const generateToken = (_id) => {
  return jwt.sign(
    { /*payload*/ _id },
    /*secret*/ process.env.SECRET_KEY
    /*option , it remain loged in for 3 days */
  );
};

const createUser = async (req, res, next) => {
  //user data validation
  //check emptiness
  const { userData } = req.body;

  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password ||
    !userData.mobile
  ) {
    next(new customError("All fields are required , missing inputs", 400));
    return;
    // throw new Error("Please enter all feilds");
  }

  //end check emptiness
  //check email

  if (!validator.isEmail(userData.email)) {
    return next(new customError("Email   not valid ", 400));
  }
  //check strong password
  // if(!validator.isStrongPassword(userData.password)){
  //   next(new customError("Insecure password  ",400))
  //   return;
  // }
  //check dz mobile number
  const country = "ar-DZ";
  if (
    !validator.isMobilePhone(userData.mobile, country, { strictMode: false })
  ) {
    next(new customError(" mobile number not valid", 400));
    return;
  }
  //end data validation
  //check user existance
  const userMail = userData.email;
  const userFound = await user.findOne({ email: userMail });
  if (!userFound) {
    // create the new user , hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const newUser = new user(userData);
    const returnedUser = await newUser.save();

    // const newUser = await user.create(userData);
    //create token
    const token = generateToken(newUser._id);
    res.cookie(" jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 2,
    });
    res.status(200).json({
      success: true,
      token,
      newUser: returnedUser,
    });
  } else {
    res.status(409).json({
      success: false,
      message: "user already exists",
      user: userFound,
    });
  }
};
/************************************************* */
const loginUser = async (req, res, next) => {
  const emailAndPassword = req.body;

  if (!emailAndPassword.email || !emailAndPassword.password) {
    next(new Error("all fiels must be filled"));
  }
  const userfound = await user.findOne({ email: emailAndPassword.email });
  if (!userfound) {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials. User not found.',
    });
  } else {
    let comparePassword = await bcrypt.compare(
      emailAndPassword.password,
      userfound.password
    );
    if (!comparePassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.',
      });
    } else {
      // create token
      const token = generateToken(userfound._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 2 });
      res.status(200).json({
        success : true,
        token,
        user: userfound,
      });
    }
  }
};

module.exports = { createUser, loginUser };
