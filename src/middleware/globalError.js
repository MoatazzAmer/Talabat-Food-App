

export const globalError = (err , req , res , next)=>{
    let code = err.statusCode || 500;
    res.status(code).json({message:"Error",error:err.error , code , stack:err.stack})
};