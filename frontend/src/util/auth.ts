import jwt, { JwtPayload } from 'jsonwebtoken';

export const isTokenExpired = (token: string): boolean => {
    const decodedToken = jwt.decode(token) as JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
        return true;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
}