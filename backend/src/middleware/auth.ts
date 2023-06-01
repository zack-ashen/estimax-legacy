import jwt, { Secret } from 'jsonwebtoken'

import { TokenPayload } from '../types';

export function authenticate(req, res, next) {
    // This is a very simplified example. In a real-world scenario, you might 
    // check for a valid JWT (JSON Web Token) in the request headers, and 
    // verify the token's signature.
  
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Auth Error: Token not provided' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_PUBLIC_KEY!) as TokenPayload;

        if (payload.scope !== scope) {
            return res.status(403).json({ message: 'Forbidden: insufficient scope' });
        }
        next()
    } catch (e) {
        console.error(e);
        return res.status(401).send({ message: 'Invalid Token' });
    }
  }


  export function for