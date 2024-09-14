
const asyncHandler= (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
};

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         // res.status(error.code || 500).json(() => {
//         //         sucess:false;
//         //         message:error.message;
//         // })
//         // res.status(500);
//         res.send("error has occured");
//     }
// }

export { asyncHandler };