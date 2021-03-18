import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
    id: number,
    iat: number,
    exp: number
}

export default 
function authMiddleware (
    request: Request, response: Response, next: NextFunction
){
    const { authorization } = request.headers ;
    
    if (!authorization) {
        return response.status(401).json({ message: "User is not valid" })
    }

    const token = authorization.replace('Barer', '').trim();
    try {
        const data = jwt.verify(token, process.env.TOKEN)
        console.log(data);

        const { id } = data as TokenPayLoad;
        request.userId = id;

        return next();

    } catch(err) {
        return response.status(401).json({ message: "User is not valid" })
    }
}
