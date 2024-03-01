const errorHandling = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status  = err.status || "erreur";
   res.status(err.statusCode).json({
     status : err.status,
     message : err.message,
     statusCode : err.statusCode,
     isop : err.isOperational,
   });
 };
 module.exports = errorHandling;