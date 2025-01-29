
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generarJWTAccess = (id) => {

    const payload = {
        id,
        randomValue: Math.random().toString(36).substring(2,15),
    };

    return jwt.sign(payload,process.env.JWT_SECRET_ACCESS,{
        expiresIn:'20m',
    })
}

export default generarJWTAccess