import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next)=>{
    try {
    
        const token = req.headers.token;
        if(!token){
            return next(res.status(404).json({
                success: false,
                message: "token not found"
            }))
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err){
                return next(res.json({
                    success: false,
                    message: "invalid token"
                }))
            }else{
                req.user = user;
                next();
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}