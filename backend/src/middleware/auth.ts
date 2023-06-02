import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

import { TokenPayload } from '../types';

export function authenticate(scope: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth Error: Token not provided' });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_PUBLIC_KEY!) as TokenPayload;

            if (scope !== 'both' && payload.scope !== scope) {
                return res.status(403).json({ message: 'Forbidden: insufficient scope' });
            }
            next()
        } catch (e) {
            console.error(e);
            return res.status(401).send({ message: 'Invalid Token' });
        }
    }
  }