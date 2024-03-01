const express = require("express");
const app = express();

const authRoute = require("./routes/api/authRoute") 
const CustomError = require("./utils/customError")
const errorHandling = require("./controller/errorController")
const cors = require("cors");
const cookieParser = require("cookie-parser");
 



// this middleware is same as the next middleware but it is used when we recieve json data so it allow us to parse to json
app.use(express.json())
// this middleware allow us to access informations comming from form
app.use(express.urlencoded(  {extended : false}))
// const corsOptions ={
// origin: 'http://localhost:3000',  // Replace with your frontend URL
// credentials: true,  // Allow credentials (cookies)
// methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// allowedHeaders: 'Content-Type',
// };

// app.use(cors(corsOptions));
app.use(cookieParser())



app.get("/", (req, res) => {
  res.send("hello");
  res.status(500)
});



// authentification route
 app.use("/api/auth",authRoute)

// default route
  app.all("*",(req,res,next)=>{
  
    const err = new CustomError(`can't find ${req.originalUrl} on the server` , 404)
    next(err)
 })

 app.use(errorHandling)


  app.listen((process.env.PORT || 4000), () => console.log("server is listning "))
