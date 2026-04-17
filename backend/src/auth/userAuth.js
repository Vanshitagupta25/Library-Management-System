import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req,res,next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message: 'No Token'});
  }
  try{
    const tokenParts = token.split(' ')[1];
  
    const decoded = jwt.verify(tokenParts, process.env.JWT_SECRET);

    req.user = decoded;
    next();
 }  catch (err) {
    return res.status(401).json({message: 'Invalid or expired token'});
 }
}
export default authMiddleware;